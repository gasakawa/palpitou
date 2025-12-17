import { ComponentType } from 'react'
import { ActionFunction, LoaderFunction, RouteObject } from "react-router-dom";

export interface RouteConfig extends Omit<RouteObject, "children"> {
	title?: string;
	permission:  "public";
	selectCompanyIsRequired?: boolean;
	providers?: Array<ComponentType<{ children: React.ReactNode }>>;
	children?: RouteConfig[];
	loader?: LoaderFunction;
	action?: ActionFunction;

}
