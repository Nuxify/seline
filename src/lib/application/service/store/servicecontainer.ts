import axios from 'axios'
import { AxiosConfig } from '$lib/configs/axios'
import type { ISocialRepository as SocialRepositoryInterface } from '$lib/domain/repository/social.repository'
import { SocialRepository } from '$lib/infrastructures/repository/social.repository'
import type { ILocalStorageRepository as LocalStorageInterface } from '$lib/domain/repository/localstorage.repository'
import { LocalStorageRepository } from '$lib/infrastructures/repository/localstorage.repository'

/// dependency injection
const $axios = axios.create(AxiosConfig) // base axios

export const ISocialRepository: SocialRepositoryInterface = new SocialRepository($axios)
export const ILocalStorageRepository: LocalStorageInterface = new LocalStorageRepository()
