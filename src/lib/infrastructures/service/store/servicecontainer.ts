import axios from 'axios'
import { AxiosConfig } from '$lib/configs/axios'
import {
	SocialRepository,
	type ISocialRepository as SocialRepositoryInterface
} from '$lib/infrastructures/repository/social.repository'
import {
	LocalStorageRepository,
	type ILocalStorageRepository as LocalStorageInterface
} from '$lib/infrastructures/repository/localstorage.repository'

/// dependency injection
const $axios = axios.create(AxiosConfig) // base axios

export const ISocialRepository: SocialRepositoryInterface = new SocialRepository($axios)
export const ILocalStorageRepository: LocalStorageInterface = new LocalStorageRepository()
