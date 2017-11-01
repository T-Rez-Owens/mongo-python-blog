"""Delete the lowest score for each student"""
#!/usr/bin/env python
import pymongo

# establish a connection to the database
CONNECTION = pymongo.MongoClient("mongodb://localhost")

# get a handle to the school database
DB = CONNECTION.school
STUDENTS = DB.students


def find():
    """This function deletes the lowest score for each student"""
    print "find, reporting for duty"
    student_id = 0.0
    for one in range(0, 300):
        query = {'scores.type': 'homework', '_id':student_id+one}
        filter_fields = {'name':1, 'scores.type':1, 'scores.score':1}
        try:
            cursor = STUDENTS.find(query, filter_fields)
            cursor.sort([('_id', pymongo. ASCENDING)])
        except Exception as e:
            print "Unexpected error:", type(e), e
        for doc in cursor:
            size = len(doc['scores'])
            student_low_score = 101
            for i in range(0, size):
                if doc['scores'][i]['type'] == "homework":
                    if student_low_score > doc['scores'][i]['score']:
                        student_low_score = doc['scores'][i]['score']
                        student_low_score_index = i
                        print doc["_id"], doc['name'], " ", doc['scores'][i]['type'], " ", doc['scores'][i]['score']
            print "Lowest Score to be removed: ", doc["_id"], doc['name'], " ", doc['scores'][student_low_score_index]['type'], " ", doc['scores'][student_low_score_index]['score']
            del doc['scores'][student_low_score_index]
            print "Lowest Score removed: ", doc
            #doc2 = students.find_one({'_id': doc['_id']})
            #print "2 ", doc2
            STUDENTS.replace_one({'_id': doc['_id']}, doc)
            score = STUDENTS.find_one({'_id': doc['_id']})
            print "after: ", score
if __name__ == '__main__':
    find()
