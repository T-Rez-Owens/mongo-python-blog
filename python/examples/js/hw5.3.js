use test;
db.grades.aggregate([
    /* unwind by tags */
    {"$unwind":"$scores"},
    /* now group by tags, counting each tag */
    {"$match":{$or:[{"scores.type":"exam"},{"scores.type":"homework"}]}},
    {"$group":{"_id":{"stud_ID":"$student_id","class_ID":"$class_id"},"studentAverage":{$avg:"$scores.score"}}},
    {"$group":{"_id":"$_id.class_ID","classAverage":{$avg:"$studentAverage"}}},
    {"$project":{"_id":1,classAverage:1}},
    {"$sort":{"classAverage":-1}}
    
])
