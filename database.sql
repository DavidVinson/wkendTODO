CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY,
	"task_name" VARCHAR(120) NOT NULL,
	"created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	"completed_at" TIMESTAMP WITH TIME ZONE,
	"isComp" BOOLEAN DEFAULT FALSE
);

--insert initial values
INSERT INTO "tasks" ("task_name")
VALUES ('mow lawn'),
('sweep garage'),
('stain deck');

--simululate tasks added later
INSERT INTO "tasks" ("task_name")
VALUES ('rake leaves'),
('wash car');

--siumate tasks added later
INSERT INTO "tasks" ("task_name")
VALUES ('get haircut');

--select all records from table tasks
SELECT * FROM "tasks";

--select all records from table tasks and sort descending by isComp field
SELECT * FROM "tasks" ORDER BY "isComp" DESC, "completed_at" DESC;

--update a task by task name and set current time
UPDATE "tasks" SET "completed_at"=CURRENT_TIMESTAMP
WHERE "task_name"='sweep garage';

--update a task by id to be completed and set current time
UPDATE "tasks" SET "isComp"=TRUE, "completed_at"=CURRENT_TIMESTAMP
WHERE "id"='3';

--count all tasks
SELECT COUNT(*) FROM "tasks";

--count completed tasks
SELECT COUNT("isComp") FROM "tasks"
WHERE "isComp"='TRUE';

--delete a task by id
DELETE FROM "tasks" WHERE "id"='3';

--boom...start over!
DROP TABLE "tasks";