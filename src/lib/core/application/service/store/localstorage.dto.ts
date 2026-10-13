export interface StateDTO {
	lastKnownKey: string
	lastKnownValue: string
}

export enum LsKeys {
	LAST_KNOWN_MESSAGE = 'lastKnownMessage',
	USERS = 'seline.users',
	SESSION = 'seline.session'
}
