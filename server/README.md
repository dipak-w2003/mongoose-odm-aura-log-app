# Connection

# ODM CRUD Operations's

## Explain all Modals & proper usecase

## MongoDB + Mongoose Transactions – Full Explanation With Syntax

```txt

1. Overview

MongoDB normally executes operations independently. If one delete
operation succeeds and another fails, MongoDB will NOT automatically
roll back changes. This can cause inconsistent data.

Mongoose Sessions & Transactions allow grouping multiple operations into
a single “all-or-nothing” block.

2. What Is a Session?

A session is a temporary workspace that groups several operations
together.

Syntax:

    const session = await mongoose.startSession();

Meaning: - Creates a private execution context for DB operations -
Required before starting a transaction

3. What Is a Transaction?

A transaction ensures multiple operations behave as ONE single atomic
action.

Syntax:

    session.startTransaction();

Meaning: - All operations inside the transaction must either succeed
together or fail together.

Inside a transaction:

    await Model.create([{ ... }], { session });
    await Model.updateOne({ ... }).session(session);
    await Model.deleteOne({ ... }).session(session);

4. What Is Commit?

commitTransaction() finalizes the transaction and saves all changes
permanently.

Syntax:

    await session.commitTransaction();

Meaning: - Confirms that all operations succeeded - Writes everything to
the database

5. What Is Abort?

abortTransaction() cancels the transaction and undoes all operations
inside it.

Syntax:

    await session.abortTransaction();

Meaning: - Rolls back everything and leaves the database unchanged

6. Why Do We Need Transactions?

Without transactions: - Todo deleted ✔ - Subtasks deletion fails ❌ -
Database becomes inconsistent

With transactions: - Both must succeed or both fail → SAFE

Use transactions to maintain data integrity across multiple collections.

7. When Should You Use Transactions?

Use when operations depend on each other:

-   Delete Todo + Delete Subtasks
-   Create Order + Create Payment + Decrease Stock
-   Register User + Create Profile Document
-   Banking operations (transfer money)

Avoid transactions for: - Basic CRUD - High-frequency operations -
Single-document writes

8. Example: Delete Todo + Subtasks With Transaction

    deleteAEntireTodo: async (req, res) => {
      const { todoId } = req.params;

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        await Promise.all([
          TodoModel.deleteOne({ _id: todoId }).session(session),
          TodoSubtaskModel.deleteMany({ todoId }).session(session),
        ]);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
          message: "Todo and subtasks deleted successfully!"
        });
      } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({ error: error.message });
      }
    }

9. Glossary

-   Session: temporary DB workspace for grouped operations
-   Transaction: runs operations atomically
-   Commit: finalize and save everything
-   Abort: rollback and undo everything
-   Atomicity: all operations succeed or none
-   Consistency: database always stays in valid state



```
