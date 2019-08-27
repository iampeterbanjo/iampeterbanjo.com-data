import { expect } from "@hapi/code";
import Lab from "@hapi/lab";

const { exampleOutput } = require("../fixtures");
const { checkCharacter, checkMove, makeMove } = require("../../lib/helpers");

export const lab = Lab.script();
const { test, suite } = lab;

suite("Given checkCharacter", () => {
	suite("And an example output", () => {
		test("it passes validation", async () => {
			await expect(checkCharacter(exampleOutput)).not.to.reject();
		});
	});
});

suite("Given makeMove", () => {
	suite("And an raw data", () => {
		const raw = {
			"Cassie Cage": "Air Power Slam",
			field2: "(Air) D1+3",
			field3: "UB",
			field4: "7",
			field5: "2",
			field6: "11",
			field7: "N/A",
			field8: "-2",
			field9: "53"
		};

		test("the keys are correct", () => {
			const move = makeMove(raw, "normals");
			const keys = Object.keys(move);

			expect(keys).to.only.include([
				"notation",
				"start_up",
				"hit_level",
				"name",
				"type",
				"active",
				"recovery",
				"block_advantage",
				"hit_advantage",
				"cancel",
				"notes"
			]);
		});
	});
});

suite("Given checkMove", () => {
	suite("And an raw data", () => {
		const invalid = {
			"Cassie Cage": "Air Power Slam",
			field2: "(Air) D1+3",
			field3: "UB",
			field4: "7",
			field5: "2",
			field6: "11",
			field7: "N/A",
			field8: "-2",
			field9: "53"
		};

		test("it does NOT pass validation", async () => {
			await expect(checkMove(invalid)).to.reject();
		});

		test("it passes validation after transformation", async () => {
			const result = checkMove(makeMove(invalid));
			await expect(result).not.to.reject();
		});
	});
});
