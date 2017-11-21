use test;
db.zips.aggregate([
    /* unwind by tags */
    {"$unwind":"$comments"},
    /* now group by tags, counting each tag */
    {"$group": 
     {"_id":"$comments.author",
      "average":{$avg:1}
     }
    },
    /* sort by popularity */
    {"$sort":{"count":1}},
    /* show me the top 10 */
    {"$limit": 100},
    /* change the name of _id to be tag */
    {"$project":
     {_id:0,
      'author':'$_id',
      'count' : 1
     }
    }
    ])
