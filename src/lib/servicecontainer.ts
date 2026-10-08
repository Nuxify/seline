import axios from 'axios'
import { AxiosConfig } from '#lib/configs/axios.js'
import type { ISocialRepository } from '#lib/core/domain/repository/social.repository.js'
import { SocialRepository as SocialRepositoryImpl } from '#lib/core/infrastructures/repository/social.repository.js'
import type { ILocalStorageRepository } from '#lib/core/domain/repository/localstorage.repository.js'
import { LocalStorageRepository as LocalStorageRepositoryImpl } from '#lib/core/infrastructures/repository/localstorage.repository.js'

/// dependency injection
const $axios = axios.create(AxiosConfig) // base axios

export const SocialRepository: ISocialRepository = new SocialRepositoryImpl($axios)
export const LocalStorageRepository: ILocalStorageRepository = new LocalStorageRepositoryImpl()
