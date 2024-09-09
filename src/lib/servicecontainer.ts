import axios from 'axios'
import { AxiosConfig } from '$lib/configs/axios'
import type { ISocialRepository } from '$lib/core/domain/repository/social.repository'
import { SocialRepository as SocialRepositoryImpl } from '$lib/core/infrastructures/repository/social.repository'
import type { ILocalStorageRepository } from '$lib/core/domain/repository/localstorage.repository'
import { LocalStorageRepository as LocalStorageRepositoryImpl } from '$lib/core/infrastructures/repository/localstorage.repository'

/// dependency injection
const $axios = axios.create(AxiosConfig) // base axios

export const SocialRepository: ISocialRepository = new SocialRepositoryImpl($axios)
export const LocalStorageRepository: ILocalStorageRepository = new LocalStorageRepositoryImpl()
