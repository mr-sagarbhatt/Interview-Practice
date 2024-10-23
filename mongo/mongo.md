[YT](https://www.youtube.com/watch?v=tww-gbNPOcA&t=162s)
[Sample Data](https://www.canva.com/design/DAGNfeKTz_Q/nJB6OKFDJxFxiAxklMrVXw/edit)
[PPT](https://www.canva.com/design/DAGMvEWWNiA/45pt6qAw4b5LyswAqKLRPA/edit)

### Topics:

- Intro
- What is MongoDB?
- MongoDB Basic Queries
- What is MongoDB ATLAS?
- Create & Drop Database, Collection
- CRUD Operations in Mongodb
- CREATE
- READ
- UPDATE
- DELETE
- DataTypes in Mongodb
- Operators in Mongodb
- Cursor Method in Mongodb
- Aggregate Framework in Mongodb
- Aggregate with String Operators
- Aggregate with Arithmetic Operators
- Conditions (IF-ELSE) in mongodb
- Variables in Mongodb
- Data Modeling in Mongodb
- Schema Validation in Mongodb
- Indexes in Mongodb
- Transactions in Mongodb
- Sharding in Mongodb
- Replica in Mongodb
- Mongodb Interview Questions

# What is Database?

- `An organized collection of data`. A method to manipulate and access the data.

# What is MongoDB?

- MongoDB is a `NoSQL Database` that stores data in flexible, `JSON-like documents`, making it easy to scale and handle large volumes of `unstructured data`.

# What is MongoDB Structure?

- MongoDB stores data in `collections` and `documents`.
- A `collection` is a group of MongoDB documents (like a table).
- A `document` is a set of fields (like a row).
- A `filed` is a key-value pairs within a document (like a column).

# SQL vs NoSQL:

1. Scalability.
   - NoSQL: Designed to scale horizontally by adding more servers.
   - SQL: Typically scale vertically by adding more resources to a server which has limits and can be costly, Horizontal scaling(sharding) is more complex and less efficient.
2. Schema Flexibility.
   - NoSQL: Schema-less design allows for easy storage of diverse and rapidly changing data without needing to alter the schema.
   - SQL: Requires a predefined schema. Altering the schema (e.g., adding new columns) can be complex and time-consuming, especially with datasets.
3. Performance.
   - NoSQL: Optimized for high-speed read and write operations, making it ideal for real-time data processing and analytics.
   - SQL: Though performant, it can suffer from slower read/write operations when dealing with very large volumes of data due to ACID transaction overhead and complex joins.
4. Handling unstructured data.
   - NoSQL: Efficiently handles unstructured or semi-structured data, which is common in real-time analytics (e.g., varied user activity types).
   - SQL: Best suited for structured data. Handling unstructured data requires complex transformations or additional systems (e.g., storing JSON data in columns).

# Basic Queries:

- `show dbs`: List all databases.
- `use {dbName}`: Create a database or Switch a database, if database doesn't exists create a database and switch a database.
- `db.{collectionName}.insertOne({key: value})`: Insert a document to a collection, if collection doesn't exists create a collection and insert a document. It will create a unique id for all the documents named `_id`.
- `db.{collectionName}.insertMany([{key: value}, {key: value}])`: Insert an array of document to a collection, if collection doesn't exists create a collection and insert a document. It will create a unique id for all the documents named `_id`.
- `db.{collectionName}.find()`: List all documents from a collection.
- `db.{collectionName}.findOne()`: Find a document from a collection.

# Mongo Atlas:

- A cloud based platform to store data on cloud.

# Database and collection

## Creating

`use {dbName}`: Create a database or Switch a database, if database doesn't exists create a database and switch a database.
`db.createCollection("collectionName")`: Create a collection.

## Connect

## Listing

`show dbs`: List all databases.
`show collections`: List all collections.

## Dropping

`db.dropDatabase()`: Drop a database. You have to connect to a database first.
`db.{collectionName}.drop()`: Drop a collection.

# CRUD Document

## create (Insert data)

1. insetOne()

- `db.{collectionName}.insertOne({key: value})`: Insert a document to a collection, if collection doesn't exists create a collection and insert a document. It will create a unique id for all the documents named `_id`.

2. insetMany()

- `db.{collectionName}.insertMany([{key: value}, {key: value}])`: Insert an array of document to a collection, if collection doesn't exists create a collection and insert a document. It will create a unique id for all the documents named `_id`.

## Read data

1. find()

- `db.{collectionName}.find()`: List all documents from a collection.
- `db.{collectionName}.find({query})`: List all documents that matches a query.
  Ex: db.cars.find({makers: "Tata"})
- `db.{collectionName}.find({query}, {projection})`: List all documents that matches a query and return fields those are mentioned in the projection.
  Ex: `db.cars.find({"engine.type": "Turbocharged", features: "Touchscreen"}, {maker: 1, _id: 0})` - 1=true, 0=false
  Here, Nested Object can be filtered by ".", Ex: "engine.type": "Turbocharged"
  Array of string can be filtered same as string, Ex: features: "Touchscreen"

1. findOne()

- `db.{collectionName}.findOne()`: Find a document from a collection. By default return the first document.
- `db.{collectionName}.findOne({query})`: List first document that matches a query.
  Ex: db.cars.findOne({makers: "Tata"})
- `db.{collectionName}.findOne({query}, {projection})`: List first document that matches a query and return fields those are mentioned in the projection.

## Update data

1. updateOne()

- `db.{collectionName}.updateOne({query}, {fieldsToSet}, {upsert: true | false})`: Update first document from a collection that matches a query.

### upsert:

- Update or insert data (Upsert) - combination of the operations "update" and "insert".
- If no document matches the query criteria, MongoDB will insert a new document into the collection.

### Examples:

- Add new fields to a document.

  - db.cars.updateOne({model: "Nexon"}, {$set: {color: "red", airbags: 5 }})

- Add element to an array field from a document.

  - db.cars.updateOne({model: "Nexon"}, {$set: {color: "red", airbags: 5 }, $push: {features: "Heated Seats"}})

- Add elements to an array field from a document.

  - db.cars.updateOne({model: "Nexon"}, {$set: {color: "red", airbags: 5 }, $push: {features: {$each: ["Heated Seats", "test"]}}})

- Remove element from an array field from a document.

  - db.cars.updateOne({model: "Nexon"}, {$set: {color: "red", airbags: 5 }, $pull: {features: "Heated Seats"}})

- Remove elements from an array field from a document.

  - db.cars.updateOne({model: "Nexon"}, {$set: {color: "red", airbags: 5 }, $pull: {features: {$in: ["Heated Seats", "test"]}}})

- Remove a filed from a document.

  - db.cars.updateOne({model: "Nexon"}, {$unset: {color: ""}})

- Add fields to all documents.

  - db.cars.updateOne({}, {$set: {color: "Blue" }})

- Operators:
- `$set`: To add or change fields.
- `$push`: add an element to an array field.
- `$pull`: remove an element from an array field.
- `$each`: add multiple elements to an array field.
- `$in`: selects the documents whose field holds an array.
- `$unset`: To remove fields.

2. updateMany()

- `db.{collectionName}.updateOne({query}, {fieldsToSet})`: Update all documents from a collection that matches a query.

## Delete data

1. deleteOne()

- `db.{collectionName}.deleteOne({query})`: Delete first document from a collection that matches a query.

2. deleteMany()

- `db.{collectionName}.deleteMany({query})`: Delete all documents from a collection that matches a query.

# [Data Types](https://www.mongodb.com/docs/manual/reference/bson-types/?utm_source=canva&utm_medium=iframely)

- MongoDB stores data in BSON (Binary JSON) format.
- BSON includes all JSON datatypes and adds more.
- Choosing the correct datatype is essential for efficient storage and querying.
- Types: ObjectId, String, Integer, Double, Boolean, Array, Object/Embedded Document, Date, Null, Timestamp, Decimal128.

# [Operators](https://www.mongodb.com/docs/manual/reference/operator/)

## Query Selectors Operators:

### Comparison Operators:

- `$eq`: Matches values that are equal to a specified value.
  - Ex: db.cars.find({"engine.cc": {$eq: 1199}})
- `$ne`: Matches all values that are not equal to a specified value.
  - Ex: db.cars.find({"engine.cc": {$ne: 1199}})
- `$gt`: Matches values that are greater than a specified value.
  - Ex: db.cars.find({"engine.cc": {$gt: 1400}})
- `$gte`: Matches values that are greater than or equal to a specified value.
  - Ex: db.cars.find({"engine.cc": {$gte: 1400}})
- `$lt`: Matches values that are less than a specified value.
  - Ex: db.cars.find({"engine.cc": {$lt: 1400}})
- `$lte`: Matches values that are less than or equal to a specified value.
  - Ex: db.cars.find({"engine.cc": {$lte: 1400}})
- `$in`: Matches any of the values specified in an array.
  - Ex: db.cars.find({"engine.cc": {$in: [1498, 2179]}})
- `$nin`: Matches none of the values specified in an array.
  - Ex: db.cars.find({"engine.cc": {$nin: [1498, 2179]}})

### Logical Operators:

- `$and`: Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
  - Ex: db.cars.find({$and: [{fuel_type: "Diesel"}, {"engine.type": "Turbocharged"}, {sunroof: true}]})
- `$not`: Inverts the effect of a query predicate and returns documents that do not match the query predicate.
  - Ex: db.cars.find({fuel_type: { $not: {$in: ["Petrol"]}}})
- `$or`: Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
  - Ex: db.cars.find({$or: [{fuel_type: "Diesel"}, {"engine.type": "Turbocharged"}]})
- `$nor`: Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
  - Ex: db.cars.find({$nor: [{fuel_type: "Diesel"}, {"engine.type": "Turbocharged"}]})

### Element:

- `$exists`: Matches documents that have the specified field.
  - Ex: db.cars.find({color: { $exists: true}})
- `$type`: Selects documents if a field is of the specified type.
  - Ex: db.cars.find({model: { $type: "null"}})

### Array:

- `$all`: Matches arrays that contain all elements specified in the query.
  - Ex: db.cars.find({features: {$all: ["Bluetooth"]}})
- `$size`: Selects documents if the array field is a specified size.
  - Ex: db.cars.find({features: {$size: 5}})

# [Cursor Methods](https://www.mongodb.com/docs/manual/reference/method/js-cursor/)

- `Count No of documents`: find().count()
  - Ex: db.cars.find({fuel_type: "Diesel"}).count()
- `Sort documents`: find().sort({"name":1}), -1 is for descending order
  - Ex: db.cars.find().sort({model: 1})
- `Limit documents`: find().limit(2)
  - Ex: db.cars.find().limit(2)
- `Skip documents`: find().skip(3)
  - Ex: db.cars.find().limit(3)

# Aggregate Framework

[Aggregation Operators](https://www.mongodb.com/docs/manual/reference/operator/aggregation/)

- The aggregate framework is a powerful tool for data processing and analysis in MongoDB. It allows you to perform complex data processing tasks, such as filtering, grouping, sorting, reshaping, and summarizing data in a flexible way via pipeline.
- Here the data is refined through the multiple stages.

`db.{collectionName}.aggregate([ {stage1}, {stage2}, ... ], {options}])`

## Most commonly used stages in MongoDB aggregation:

- `$match`: Filter Records, similar to find
- `$group`: Group records based on a field.

```
Syntax of ‘group’:

db.collection.aggregate([
{
$group: {
_id: "$category",
totalAmount: { $sum: "$amount" },
averageAmount: { $avg: "$amount" },
minAmount: { $min: "$amount" },
maxAmount: { $max: "$amount" },
amountsList: { $push: "$amount" },
uniqueAmounts: { $addToSet: "$amount" }
}
}
])
```

- `$project`: Return fields those are mentioned in the project, Similar to projection, We can also create a new field using it.
- `$sort`: Sort records.
- `$limit`
- `$unwind`
- `$lookup`
- `$addFields`: create a new field and attached to result
- `$set`: create a new field and attached to result
- `$count`
- `$skip`
- `$out`: store result in a new collection

Example:

```js
// $group
db.cars.aggregate([
  {
    $group: { _id: '$maker' }, // Print all the car brands.
    TotalCars: { $sum: 1 }, // Find no of cars of each brands. (we have to group)
    AvgPrice: { $avg: '$price' },
    MinPrice: { $min: '$price' },
    MaxPrice: { $max: '$price' },
    AmountsList: { $push: '$price' },
    UniqueAmounts: { $addToSet: '$price' },
  },
])

// $match
db.cars.aggregate([{ $match: { maker: 'Hyundai', 'engine.cc': { $gt: 1200 } } }])

// $count
db.cars.aggregate([{ $match: { maker: 'Hyundai', 'engine.cc': { $gt: 1200 } } }, { $count: 'TotalCars' }])

// Count no of diesel petrol cars of Hyundai brands
db.cars.aggregate([{ $match: { maker: 'Hyundai' } }, { $group: { _id: '$fuel_type', Total: { $sum: 1 } } }])

// Find all the Hyundai cars and only show Maker, Model and Fuel_type details
db.cars.aggregate([{ $match: { maker: 'Hyundai' } }, { $project: { _id: 0, maker: 1, model: 1, fuel_type: 1 } }])

// Sort data based on Model
db.cars.aggregate([
  { $match: { maker: 'Hyundai' } },
  { $project: { _id: 0, maker: 1, model: 1, fuel_type: 1 } },
  { $sort: { model: 1 } },
])

// Group the cars by Maker and then sort based on count(no. of cars)
db.cars.aggregate([{ $sortByCount: '$maker' }])

// We do have multiple owners for each car right (owners are list of documents), now if you want to work on each owner then we can use unwind
db.cars.aggregate([{ $unwind: '$owners' }])
```

## Commonly used String Operators

- `$concat`
- `$toUpper`
- `$toLower`
- `$regexMatch`
- `$ltrim`
- `$split`

```js
// List down all the Hyundai cars and print the name as  Maker + Model i.e. CarName Hyundai Creta
db.cars.aggregate([
  { $match: { maker: 'Hyundai' } },
  {
    $project: {
      _id: 0,
      maker: { $toUpper: '$maker' },
      model: { $toLower: '$model' },
      CarName: { $toUpper: { $concat: ['$maker', ' ', '$model'] } },
    },
  },
])
```

### $regexMatch

- Performs a regular expression (regex) pattern matching and returns true or false.

```js
// Add a flag is_diesel = true/false for each car
db.cars.aggregate([
  {
    $project: { _id: 0, fuel_type: 1, isDiesel: { $regexMatch: { input: '$fuel_type', regex: 'die', options: 'i' } } }, // i for case-insensitive
  },
])
```

## $out - store result in a new collection

```js
// After aggregating, store the result in an another collection 'hyundai_cars'
db.cars.aggregate([
  { $match: { maker: 'Hyundai' } },
  { $project: { _id: 0, CarName: { $concat: ['$maker', ' ', '$model'] }, document: '$$ROOT' } },
  { $out: 'hyundai_cars' },
])
```

## Commonly used Arithmetic Operators

- `$add`
- `$subtract`
- `$divide`
- `$multiply`
- `$round`
- `$abs`
- `$ceil`

```js
// Print all the cars model and price with hike of 55000 (similarly we can use $subtract too)
db.cars.aggregate([{ $project: { _id: 0, maker: 1, model: 1, price: 1, newPrice: { $add: ['$price', 55000] } } }])
```

### $addFields / set

```js
// Print details of cars with price in lakhs  (15 lakhs)
db.cars.aggregate([
  { $project: { _id: 0, model: 1, price: 1 } },
  {
    $addFields: {
      priceInLacs: { $concat: [{ $toString: { $round: [{ $divide: ['$price', 90000] }, 2] } }, ' ', 'lacs'] },
    },
  },
])

// Calculate Total service cost of each Hyundai Car.
db.cars.aggregate([
  { $match: { maker: 'Hyundai' } },
  { $set: { serviceCost: { $sum: '$service_history.cost' } } },
  { $project: { _id: 0, model: 1, serviceCost: 1 } },
])
```

## Conditional Operators

- `$cond`: The $cond operator in MongoDB is a ternary conditional operator
  - {$cond: [<condition>, <true-case>, <false-case>]}
- `$ifNull`
- `$switch`
  - {$switch: {branches:[{case:<condition1>,then:<result1>}, {case:<condition2>,then:<result2>}, ...], default: <defaultValue>}}

```js
// Suppose we want to check if a car's fuel_type is "Petrol" and categorize the cars into ‘Petrol Car’ & ‘Diesel Car’
// Without if-else
db.cars.aggregate([
  {
    $project: { _id: 0, model: 1, fuelCat: { $cond: [{ $eq: ['$fuel_type', 'Petrol'] }, 'Petrol Car', 'Diesel Car'] } },
  },
])

// Suppose we want to check if a car's fuel_type is "Petrol" and categorize the cars into ‘Petrol Car’ & ‘Diesel Car’
// With if-else
db.cars.aggregate([
  {
    $project: {
      _id: 0,
      model: 1,
      fuelCat: { $cond: { if: { $eq: ['$fuel_type', 'Petrol'] }, then: 'Petrol Car', else: 'Diesel Car' } },
    },
  },
])

// Suppose we want to categorize the price of the car into three categories: "Budget", "Midrange", and "Premium"
db.cars.aggregate([
  {
    $project: {
      _id: 0,
      model: 1,
      price: 1,
      budgetCar: {
        $switch: {
          branches: [
            { case: { $lt: ['$price', 500000] }, then: 'Budget' },
            { case: { $and: [{ $gte: ['$price', 500000] }, { $lte: ['$price', 1000000] }] }, then: 'Mid-Range' },
            { case: { $gt: ['$price', 1000000] }, then: 'Premium' },
          ],
          default: 'Expensive',
        },
      },
    },
  },
])
```

## Date Operators

- `$dateAdd`
- `$dateDiff`
- `$month`
- `$year`
- `$hour`
- `$dateOfMonth`
- `$dateOfYear`

```js
db.cars.aggregate([
  {
    $project: {
      _id: 0,
      model: 1,
      price: 1,
      newDate: { $dateAdd: { startDate: new Date('2024-10-18'), unit: 'day', amount: 7 } }, // unit: "day" | "month" | "year"
    },
  },
])
```

## [Variables](https://www.mongodb.com/docs/manual/reference/aggregation-variables)

- Access using "$$" prefix
- `Object.keys(this)`: To check all variables

### System Variables

- `$$NOW`: Return current datetime value (According to your system)

```js
// Current Date
db.cars.aggregate([{ $project: { _id: 0, model: 1, currentDate: '$$NOW' } }])
```

### User Defined Variables

- These variables allow you to store values and reuse them within the same pipeline, making the pipeline more readable and efficient in certain scenarios.
- We can also assign objects to variables, so we can store some queries to variables so that it can reused.

# Data Modeling Relationship

## Relations between data

- MongoDB is a NoSQL database, it doesn't enforce strict schema relationships like foreign keys in relational databases.
- We can still model relationships between documents in MongoDB using a few approaches.
- The two ways to achieve relationships in MongoDB:
  1. `Embedded Documents` (Denormalization)
  - data stored in a document itself.
  2. `Referenced Documents` (Normalization)
  - data stored in a another collection and storing reference in a document.
  - We can join these collections using `aggregate lookup stage`
- Types of Relationship
  1. One to One: Ex: Users and Profile
  2. One to Many Ex: Users and Posts
  3. Many to Many Ex: Users and Courses

```js
// Join with $lookup
db.users.aggregate([
  {
    $lookup: {
      from: 'orders', // The target collection to join with
      localField: '_id', // The field from the 'users' collection
      foreignField: 'user_id', // The field from the 'orders' collection
      as: 'orders', // The name of the new array field to add to the 'users'
    },
  },
])
```

### Limitations of Embedded Documents

1. Document Size Limit

- Maximum document size is 16 MB.

2. Nesting Depth Limit

- Allows documents to be nested up to 100 levels deep.

So it can be used for 1to1 relationship

# [Schema Validation](https://www.mongodb.com/docs/v5.2/core/schema-validation/)

```js
// Validation while Creating a new collection
db.createCollection('user1', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'phone'],
      properties: { name: { bsonType: 'string', description: 'Name should be string' } },
    },
  },
  validationLevel: 'strict', // 'strict' | 'moderate'
  validationAction: 'error', // 'error' | 'warn'
})

// Validation on already created collection
db.runCommand({
  collMod: 'user1', // collection name to modify
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'phone'],
      properties: { name: { bsonType: 'string', description: 'Name should be string' } },
    },
  },
  validationLevel: 'strict', // 'strict' | 'moderate'
  validationAction: 'error', // 'error' | 'warn'
})
```

## Validation Levels:

1. `strict`: The document must fully comply with the schema validation rules. If a document does not comply, it will not be inserted or updated in the collection.

2. `moderate`: Only new documents and modified fields in existing documents are validated against the schema. This allows for partial validation and can be useful for legacy systems or gradual schema enforcement.

## Validation Actions:

1. `error`: If a document does not meet the schema validation criteria, MongoDB will throw an error and reject the insert or update operation.
2. `warn`: MongoDB logs a warning message when a document does not meet the schema validation criteria but still allows the insert or update operation.

# [Indexes](https://www.mongodb.com/docs/manual/indexes/)

- An `INDEX` is a data structure that improves the speed of query operations by allowing the database to quickly locate and access the required data without scanning every document in a collection.
- Stores the indexed fields in a sorted order, along with pointers to the actual documents in the collection.

db.collection.createIndex({<field1>:<type1>,<field2>:<type2>,...},{<options>})

## Types of Indexes:

1. Single Field Index
2. Compound Index: Involves multiple fields.
3. Unique Index: Index that ensures no two documents have the same value for the indexed field.
4. TTL Index: TTL (Time to Live) indexes that are used to automatically remove documents after a certain period.

## Performance Considerations:

1. `Impact on Write Operations`: While indexes speed up reads, they can slow down insertions, updates, and deletions because the indexes need to be maintained.
2. `Indexing Large Collections`: Learn about the considerations when indexing large collections, such as index size and the impact on RAM.

`db.{collection}.getIndexes()` - Get all indexes from a collection.
`db.{collection}.createIndex({ {fieldName}: 1 })` - Create an index on a collection.
`db.{collection}.createIndex({ {fieldName}: 1 }, { unique: true })` - Create a unique index on a collection.
`db.{collection}.dropIndex(“{fieldName}”)` - Remove an index from a collection.

`Note: Create an index for a field which is mostly used in the queries.`

```js
// create an index
db.users.createIndex({ name: 1 })
// create a unique index
db.users.createIndex({ phone: 1 }, { unique: 1 })
// create an index on multiple fields
db.users.createIndex({ phone: 1, email: 1 }, { unique: 1, name: 'compoundIndex' })
// TTL Index - can't be create on compound indexes
db.users.createIndex({ phone: 1 }, { unique: 1, expireAfterSeconds: 3600 })
// remove an index
db.users.dropIndex('compoundIndex')
// check execution time of a query using explain("executionStats")
db.users.find({ name: 'Vikram Desai' }).explain('executionStats')
```

# [Transaction](https://www.mongodb.com/docs/manual/core/transactions/)

- A transaction in MongoDB is a sequence of operations that are executed as a single unit, ensuring that all operations either complete successfully or are fully rolled back, maintaining ACID properties across multiple documents and collections.
- Example of a Multi-Document Transaction: You want to transfer money from one account to another, which requires updating two documents within a single transaction.

# [Sharding](https://www.mongodb.com/docs/manual/sharding/)

- Sharding is a method of distributing data across multiple servers (shards) to enable horizontal scaling, allowing the database to handle large datasets and high-throughput operations efficiently.
- Which server will accepts the request? It is handled by the Router(mongos)
- In a sharded setup, the data is logically still part of the same database, but physically, the data is spread across multiple shards. Each shard holds a portion of the database's data, and the application interacts with it as a single database instance.

# [Replications](https://www.mongodb.com/docs/manual/replication/)

- Replication is a group of MongoDB servers that maintain identical copies of data to ensure high availability, redundancy, and data durability, with one primary node handling writes and multiple secondary nodes replicating the data.

# Interview Questions

1. What is MongoDB, and how is it different from a relational database?

- MongoDB is a NoSQL database that stores data in flexible, JSON-like documents, allowing for schema- less data storage. Unlike relational databases, which use tables and rows, MongoDB uses collections and documents. This allows for more flexible and scalable data models.

2. Explain the structure of a MongoDB document. What are its key components?

- A MongoDB document is a BSON (Binary JSON) object that consists of field-value pairs. The key components include fields (which are similar to columns in relational databases) and values (which can be of various data types, such as strings, numbers, arrays, or even nested documents).

3. What are the advantages of using MongoDB over traditional RDBMS systems?

- Advantages include:
  - Flexibility in schema design.
  - Horizontal scalability via sharding.
  - High availability through replica sets.
  - Easier to manage unstructured or semi-structured data.
  - Rich querying and aggregation capabilities.

4. How does MongoDB store data? Explain the concept of collections and documents.

- MongoDB stores data in BSON format within documents. These documents are grouped into collections, which are analogous to tables in relational databases. Each document within a collection can have a different structure, allowing for flexible data modeling.

5. What is a replica set in MongoDB? How does it help in ensuring high availability?

- A replica set in MongoDB is a group of mongod instances that maintain the same data set. One node acts as the primary node, and others are secondary nodes. The replica set ensures high availability by automatically failing over to a secondary node if the primary node goes down.

6. What is a sharded cluster in MongoDB, and why is it used?

- A sharded cluster in MongoDB is a method for distributing data across multiple servers. Sharding is used to handle large datasets and high-throughput operations by distributing data and load across multiple machines.

7. Explain the differences between a find() query and an aggregate() query in MongoDB.

- The find() query is used to retrieve documents from a collection based on certain criteria. The aggregate() query, on the other hand, is used for more complex data processing, allowing for data transformation and computation through an aggregation pipeline.

8. How does MongoDB handle indexing, and what are the types of indexes available?

- MongoDB supports various types of indexes to improve query performance, including:
  - Single field index
  - Compound index (multiple fields)
  - Multikey index (for arrays)
  - Text index (for searching text)
  - Geospatial index (for querying geographical data)
  - TTL index (for automatic deletion of documents after a certain period)

9. What is the role of the `_id` field in MongoDB? Can it be modified or removed?

- The `_id` field is a unique identifier for each document in a MongoDB collection. It is mandatory and cannot be removed. However, it can be modified if necessary, though this is not recommended as it may lead to data inconsistency.

10. What is the difference between insert() and insertMany() operations in MongoDB?

- insert() is used to insert a single document into a collection, while insertMany() allows for the insertion of multiple documents in a single operation. insertMany() is more efficient for bulk inserts.

11. Explain how MongoDB's aggregation framework works. What are some common stages used in an aggregation pipeline?

- The aggregation framework in MongoDB allows for processing data in a pipeline, where each stage transforms the data. Common stages include:
  - $match: Filters documents based on a condition.
  - $group: Groups documents by a specified key and performs aggregation operations.
  - $sort: Sorts documents.
  - $project: Reshapes the documents by including/excluding fields.
  - $lookup: Performs a left join with another collection.

12. How does MongoDB handle transactions, and what is the significance of multi-document transactions?

- MongoDB supports multi-document transactions, which allow for ACID-compliant operations across multiple documents or collections. This ensures that either all operations within a transaction are applied, or none are, providing consistency and reliability in complex operations.

13. What are the pros and cons of embedding documents versus using references in MongoDB?

- Embedding (Pros):
  - Better performance for read operations.
  - Simpler queries.
- Embedding (Cons):

  - Can lead to large documents and duplication of data.

- References (Pros):

  - More normalized data structure.
  - Reduces duplication.

- References (Cons):
  - Requires additional queries (joins) which can be slower.

14. What is the difference between updateOne(), updateMany(), and replaceOne() in MongoDB?

- updateOne(): Updates the first document that matches the query criteria.
- updateMany(): Updates all documents that match the query criteria.
- replaceOne(): Replaces the entire document with a new one, based on the query criteria.

15. How does MongoDB handle concurrency and ensure data consistency?

- MongoDB handles concurrency using a combination of locks (e.g., collection-level locks) and journaling. It uses the WiredTiger storage engine, which provides document-level locking, allowing for higher concurrency. Consistency is maintained through replica sets and transactions.

16. What are the different types of data modeling strategies in MongoDB?

- Common data modeling strategies include:
  - Embedding documents for data that is frequently accessed together.
  - Referencing documents to normalize data and avoid duplication.
  - Hybrid models that combine embedding and referencing for different use cases.

17. Explain the concept of TTL (Time to Live) indexes in MongoDB and when they might be useful.

- TTL indexes automatically delete documents from a collection after a specified period. This is useful for data that becomes irrelevant after a certain time, such as session logs, temporary data, or caching.

18. How would you optimize a MongoDB query for better performance?

- To optimize a MongoDB query:
  - Use indexes effectively.
  - Avoid full collection scans by using selective queries.
  - Limit the amount of data returned by using projections.
  - Use the explain() method to analyze query performance.
  - Consider denormalization to reduce the number of joins.

19. Explain how to perform a backup and restore operation in a MongoDB database.

- Backup: Use mongodump to create a binary backup of the database.
- Restore: Use mongorestore to restore the data from a backup. Additionally, for cloud deployments, MongoDB Atlas provides automated backups.

20. Describe the process of migrating data from a relational database to MongoDB. What challenges might you face?

- The migration process involves:
  - Analyzing the relational schema.
  - Designing a MongoDB schema, often using denormalization and embedding.
  - Exporting data from the relational database (e.g., using SQL queries).
  - Importing data into MongoDB (e.g., using mongoimport or custom scripts).
  - Challenges: Schema design differences, handling joins, data type conversion, and ensuring data consistency during migration.

21. What are MongoDB's limitations, and how can you work around them?

- Limitations include:
  - No built-in support for joins (use aggregation or manual joins).
  - Limited support for multi-document ACID transactions (introduced in later versions).
  - Large documents can impact performance (use references to mitigate).
  - Working around limitations often involves thoughtful schema design, indexing, and understanding MongoDB's strengths.

22. How does MongoDB Atlas differ from running MongoDB on-premises?

- MongoDB Atlas is a fully managed cloud database service that automates deployment, scaling, and backups. It offers built-in security features and integration with other cloud services. Running MongoDB on-premises requires manual management of hardware, scaling, backups, and security.

23. Explain the role of journaling in MongoDB. How does it help in ensuring durability?

- Journaling in MongoDB is a mechanism that logs write operations to a journal file before applying them to the database. In case of a crash, MongoDB can use the journal to recover to a consistent state, ensuring durability of write operations.

24. How would you handle schema versioning in a MongoDB application?

- Schema versioning can be handled by:
  - Embedding a version field in each document.
  - Using a migration script to update existing documents to the new schema version.
  - Designing the application to handle multiple schema versions during the transition period.
