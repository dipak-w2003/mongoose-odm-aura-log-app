# Connection

# ODM CRUD Operations's

## CREATE

```ts
// create one
const newUser = await User.create({
  name: "Dipak",
  email: "dipak@example.com",
  age: 23,
});
// or insert many
await User.insertMany([
  { name: "A", email: "a@mail.com", age: 20 },
  { name: "B", email: "b@mail.com", age: 25 },
]);
```

## READ

```ts
// find all
const allUsers = await User.find();
// find with filter
const user = await User.findOne({ email: "dipak@example.com" });
// find by id
const byId = await User.findById("66c1e6b7f8...");
// find with conditions
const adults = await User.find({ age: { $gte: 18 } });
```

## UPDATE

```ts
// update one
await User.updateOne({ email: "dipak@example.com" }, { $set: { age: 24 } });
// update many
await User.updateMany({}, { $inc: { age: 1 } });
// find & update (returns new document if { new: true })
const updated = await User.findByIdAndUpdate(
  "66c1e6b7f8...",
  { age: 30 },
  { new: true }
);
```

## DELETE

```ts
// delete one
await User.deleteOne({ email: "dipak@example.com" });
// delete many
await User.deleteMany({ age: { $lt: 18 } });
// find & delete
await User.findByIdAndDelete("66c1e6b7f8...");
```
