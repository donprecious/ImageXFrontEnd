import { IImageTag } from './TagModel';
import { ICategory } from './CategoryModels';

import { IUser } from './IUserModel';



export interface IImage {
	id: number;
	imageUrl: string;
	name: string;
	description?: any;
	location?: any;
	geoLat: number;
	geoLog: number;
	Categoryid: number;
	Userid: string;
}

export interface ITag {
	name: string;
	description?: any;
	id: number;
	creationTime: string;
}



export interface IImageModel {
	id: number;
	imageUrl: string;
	name: string;
	description?: any;
	location?: any;
	geoLat: number;
	geoLog: number;
	Categoryid: number;
	Userid: string;
	user: IUser;
	category: ICategory;
	imageTag: IImageTag[];
}


export interface ICreateImageModel {
	imageUrl: string;
	name: string;
	description: string;
	location: string;
	geoLat: number;
	geoLog: number;
	categoryId: number;
	userId: string;
	tag: string[];
}
