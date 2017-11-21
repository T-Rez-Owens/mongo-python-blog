use test
db.zips.aggregate([
    {$match:
        {
            $or:[{"state":"NY"},{"state":"CA"}]

        }
    },
    {$group:
     {
	 _id: "$city",
     population: {$sum:"$pop"},
     }
    },
    {$match:
        {
            population:{$gt:25000}
        }
    },
    {$group:
        {
        _id: "$state",
        population2: {$avg:"$population"},
        }
       },
    {$project:
        {
        _id: 0,
        state: "$_id",
        population2: 1,
        }
       },

     
])


