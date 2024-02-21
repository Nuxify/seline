export interface StateDTO {
	alertMessage: string
	alertVariant: string
	drawerMiniVariant: boolean
	isShowDrawer: boolean
	showAlert: boolean
}

export interface AlertOptions {
	message: string
	variant: string
}

export enum MessageStatus {
	ERROR = 'bg-error',
	SUCCESS = 'bg-success'
}
