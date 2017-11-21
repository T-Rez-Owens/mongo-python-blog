use test;
db.zips.aggregate([
    {
        $project:{first_char: {$substr : ["$city",0,1]},population:"$pop"}
    },
    {$match:{"first_char":/[BDOGNM]/}},
    {$group:{"_id":"$first_char", "population2":{"$sum":"$population"}}},
    {$group:{"_id":"TotalPopulation", "population3":{"$sum":"$population2"}}}

])