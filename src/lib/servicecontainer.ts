import axios from 'axios'
import { AxiosConfig } from '#lib/configs/axios.ts'
import type { ISocialRepository } from '#lib/core/domain/repository/social.repository.ts'
import { SocialRepository as SocialRepositoryImpl } from '#lib/core/infrastructures/repository/social.repository.ts'
import type { ILocalStorageRepository } from '#lib/core/domain/repository/localstorage.repository.ts'
import { LocalStorageRepository as LocalStorageRepositoryImpl } from '#lib/core/infrastructures/repository/localstorage.repository.ts'

/// dependency injection
const $axios = axios.create(AxiosConfig) // base axios

export const SocialRepository: ISocialRepository = new SocialRepositoryImpl($axios)
export const LocalStorageRepository: ILocalStorageRepository = new LocalStorageRepositoryImpl()
