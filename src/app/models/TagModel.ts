import { IImage } from './IImageModels';
export interface ITag {
	name: string;
	description?: any;
	id: number;
	creationTime: string;
}

export interface IImageTag {
	imageId: number;
	image?: IImage;
	tagId: number;
	tag: ITag;
	id: number;
	creationTime: string;
}
