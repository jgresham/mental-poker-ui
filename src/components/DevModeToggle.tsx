"use client";

import { Toggle } from "@/components/ui/toggle";
import { Braces } from "lucide-react";
import {
	useDevMode,
	useSetDevMode,
} from "../hooks/devMode";

export const DevModeToggle = () => {
	const { data: devMode } =
		useDevMode();
	const { mutate: setDevMode } =
		useSetDevMode();

	console.log(
		"DevModeToggle devMode",
		devMode,
	);
	return (
		<Toggle
			className="data-[state=on]:bg-white/10"
			aria-label="Toggle dev mode"
			pressed={devMode}
			onClick={() => {
				const newValue = !devMode;
				console.log(
					"pressed",
					newValue,
				);
				setDevMode(newValue);
			}}
		>
			<Braces className="text-white" />
		</Toggle>
	);
};
