import { ResponseModel } from './../shared/models/ResponseModel';

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
	categoryid: number;
  userid: string;
  fileType: string;

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
  fileType: string;
	user: IUser;
	category: ICategory;
	imageTag: IImageTag[];
	fileInfo: FileInfoModel;
	colors: ColorModel[];
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
  fileType: string;
  tag: string[];
  colors:      CreateColorModel[];
  fileInfo:    FileInfoModel;
}
// Generated by https://quicktype.io

export interface CreateColorModel {
  code: string;
  name: string;
  level: string;
}
// Generated by https://quicktype.io

export interface ColorModel {
	code:         string;
	name:         null;
	id:           number;
	creationTime: string;
}

export interface FileInfoModel {
  imageId:  number;
  artist:   string;
  model:    string;
  software: string;
  width:    string;
  height:   string;
  duration: string;
  genre:    string;
  fileSize: string;
}

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	profileImageUrl: string;
	email: string;
}

export interface Image {
	id: number;
	imageUrl: string;
	name: string;
	description: string;
	location: string;
	geoLat: number;
	geoLog: number;
	categoryId: number;
  userId: string;
  fileType: string;
}


export interface IContentCollection {
  userId: string;
  user:          IUser;
  imageId:       number;
  image:         IImage;
  id:            number;
  creationTime:  string;
}
export interface ILike {
  userId: string;
  user:          IUser;
  imageId:       number;
  image:         IImage;
}
export interface ILikeToggleResponse extends ResponseModel{
	data: { liked: boolean};
}
// Generated by https://quicktype.io

export interface IImageGeoInfo {
  lat: number;
  lng: number;
  id:  number;
}
export interface Geometry {
	type: string;
	coordinates: number[];
}

export interface Property {
	title: string;
	url: string;
	id: number;
}

export interface Feature {
	type: string;
	geometry: Geometry;
	properties: Property;
}

export interface IGeoJson {
  type: string;
  features: Feature[];
}

