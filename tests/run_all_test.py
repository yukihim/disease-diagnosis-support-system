import unittest
import os
import sys
import matplotlib.pyplot as plt

# --- Configuration ---
# Adjust the path if you place this script elsewhere or run it from a different directory
TESTS_DIR = r'd:\WORK\_SUBJECT\_ĐATN\src\disease-diagnosis-support-system\tests'
# Add the backend directory to sys.path so tests can import app modules
BACKEND_DIR = r'd:\WORK\_SUBJECT\_ĐATN\src\disease-diagnosis-support-system\backend'
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
# Also add the parent of backend if tests use 'from app import ...'
APP_PARENT_DIR = r'd:\WORK\_SUBJECT\_ĐATN\src\disease-diagnosis-support-system'
if APP_PARENT_DIR not in sys.path:
     sys.path.insert(0, APP_PARENT_DIR)


print(f"--- Test Runner ---")
print(f"Discovering tests in: {TESTS_DIR}")

# --- Discover Tests ---
loader = unittest.TestLoader()
# Discover all files matching 'test_*.py' in the specified directory
suite = loader.discover(start_dir=TESTS_DIR, pattern='test_*.py')

if suite.countTestCases() == 0:
    print("No tests found. Exiting.")
    sys.exit(1)

print(f"Found {suite.countTestCases()} tests.")
print("-" * 20)

# --- Run Tests ---
# Use TextTestRunner to get results easily
runner = unittest.TextTestRunner(verbosity=2) # verbosity=2 shows individual test results
result = runner.run(suite)

print("-" * 20)
print("--- Test Summary ---")

# --- Summarize Results ---
total_run = result.testsRun
failures = len(result.failures)
errors = len(result.errors)
skipped = len(result.skipped)
passed = total_run - failures - errors - skipped

print(f"Total tests run: {total_run}")
print(f"Passed: {passed}")
print(f"Failures: {failures}")
print(f"Errors: {errors}")
print(f"Skipped: {skipped}")
print("-" * 20)

# --- Visualize Results ---
print("Generating results chart...")

labels = ['Passed', 'Failed', 'Errors', 'Skipped']
counts = [passed, failures, errors, skipped]
colors = ['green', 'red', 'orange', 'grey']

try:
    plt.figure(figsize=(8, 5)) # Set figure size
    bars = plt.bar(labels, counts, color=colors)
    plt.ylabel('Number of Tests')
    plt.title('Test Execution Summary')

    # Add counts above the bars
    for bar in bars:
        height = bar.get_height()
        if height > 0: # Only add text if count is > 0
            plt.text(bar.get_x() + bar.get_width() / 2., height,
                     f'{height}',
                     ha='center', va='bottom')

    plt.tight_layout() # Adjust layout
    plt.show() # Display the chart
    print("Chart displayed.")

except ImportError:
    print("\nWarning: matplotlib is not installed.")
    print("Please install it to see the visualization: pip install matplotlib")
except Exception as e:
    print(f"\nError generating chart: {e}")

print("--- Test Run Complete ---")