import React, { useState, useEffect, useRef } from 'react';
import './style/autocompleteInput.css';

function AutocompleteInput({ 
    value, 
    onChange,
    onSelectItem,
    suggestions,
    placeholder, 
    className,
    displayProperty = 'name',
    valueProperty = 'id',
    isObjectData = false
}) {
    const [inputValue, setInputValue] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef(null);

    // Initialize the input display value
    useEffect(() => {
        if (isObjectData) {
            // For object data, find the matching item by ID and display its name
            if (value) {
                const selectedSuggestion = suggestions.find(suggestion => 
                    suggestion[valueProperty].toString() === value.toString()
                );
                if (selectedSuggestion) {
                    setInputValue(selectedSuggestion[displayProperty]);
                    setSelectedItem(selectedSuggestion);
                }
            } else {
                setInputValue('');
                setSelectedItem(null);
            }
        } else {
            // Simple string value handling
            setInputValue(value || '');
        }
    }, [value, suggestions, isObjectData, displayProperty, valueProperty]);

    // Filter suggestions based on input value
    useEffect(() => {
        if (inputValue.trim() === '') {
            setFilteredSuggestions([]);
            return;
        }

        const filtered = isObjectData
            ? suggestions.filter(suggestion => 
                suggestion[displayProperty].toLowerCase().includes(inputValue.toLowerCase())
              )
            : suggestions.filter(suggestion => 
                suggestion.toLowerCase().includes(inputValue.toLowerCase())
              );
        
        setFilteredSuggestions(filtered);
    }, [inputValue, suggestions, isObjectData, displayProperty]);

    // Handle click outside to close suggestions
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
                
                // If not using object data, restore input to selected value if available
                if (!isObjectData && selectedItem) {
                    setInputValue(selectedItem);
                }
                // If using object data, restore to selected item's display property
                else if (isObjectData && selectedItem) {
                    setInputValue(selectedItem[displayProperty]);
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef, selectedItem, isObjectData, displayProperty]);

    // Handle input change
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        
        // If input is cleared, clear selection
        if (newValue === '') {
            if (isObjectData) {
                onChange('');
                setSelectedItem(null);
            } else {
                onChange('');
                setSelectedItem(null);
            }
        }
        
        setShowSuggestions(true);
        setHighlightedIndex(-1);
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        if (isObjectData) {
            setInputValue(suggestion[displayProperty]);
            setSelectedItem(suggestion);
            onChange(suggestion[valueProperty]);
            onSelectItem && onSelectItem(suggestion);
        } else {
            setInputValue(suggestion);
            setSelectedItem(suggestion);
            onChange(suggestion);
            onSelectItem && onSelectItem(suggestion);
        }
        
        setShowSuggestions(false);
        setHighlightedIndex(-1);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        // Down arrow
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prevIndex => 
                prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0
            );
        }
        // Up arrow
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prevIndex => 
                prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1
            );
        }
        // Enter key
        else if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(filteredSuggestions[highlightedIndex]);
        }
        // Escape key
        else if (e.key === 'Escape') {
            setShowSuggestions(false);
            
            // Restore to selected value if available
            if (selectedItem) {
                if (isObjectData) {
                    setInputValue(selectedItem[displayProperty]);
                } else {
                    setInputValue(selectedItem);
                }
            }
        }
    };

    return (
        <div className="autocomplete-container" ref={wrapperRef}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={`autocomplete-input ${className || ''}`}
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="autocomplete-suggestions">
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className={`suggestion-item ${index === highlightedIndex ? 'selected' : ''}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <div className="suggestion-name">
                                {isObjectData ? suggestion[displayProperty] : suggestion}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AutocompleteInput; 