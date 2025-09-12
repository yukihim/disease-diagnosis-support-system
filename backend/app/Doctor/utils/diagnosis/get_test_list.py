def get_test_list():
    from ....database.models import Test_names,Test_types
    from sqlalchemy import select
    from ....database import db
    stmt = select(
        Test_types.test_type,
		Test_names.test_name,
        Test_names.id
        
	).join(
		Test_names.test_type
	)
    
    result = db.session.execute(stmt).all()
    ans = {}
    
    for row in result:
        if(ans.get(row[0]) == None):
            ans[row[0]] = []
        ans[row[0]].append({"test_name":row[1], "test_id":row[2]})
        
    return ans
