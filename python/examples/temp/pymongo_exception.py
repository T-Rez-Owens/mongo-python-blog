#!/usr/bin/env python
import pymongo

# Do not need to import sys

connection = pymongo.MongoClient("mongodb://localhost")

db = connection.test
users = db.users

doc = {'firstname':'Andrew', 'lastname':'Erlichson'}

print "about to insert the document"
print doc

try:
    users.insert_one(doc)
except Exception as e:
    print "insert failed:", e

print doc

doc = {'firstname':'Andrew', 'lastname':'Erlichson'}


print "inserting again"
print doc


try:
    users.insert_one(doc)
except Exception as e:
    print "second insert failed:", e

print doc

