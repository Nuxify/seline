import axios from 'axios'
import { AxiosConfig } from '$lib/configs/axios'
import type { ISocialRepository as SocialRepositoryInterface } from '$lib/core/domain/repository/social.repository'
import { SocialRepository } from '$lib/core/infrastructures/repository/social.repository'
import type { ILocalStorageRepository as LocalStorageRepositoryInterface } from '$lib/core/domain/repository/localstorage.repository'
import { LocalStorageRepository } from '$lib/core/infrastructures/repository/localstorage.repository'

/// dependency injection
const $axios = axios.create(AxiosConfig) // base axios

export const ISocialRepository: SocialRepositoryInterface = new SocialRepository($axios)
export const ILocalStorageRepository: LocalStorageRepositoryInterface = new LocalStorageRepository()
