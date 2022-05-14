import { About } from './pages/about'
import { HomePage } from './pages/home-page'
import { ToyApp } from './pages/toy-app'
import { ToyEdit } from './pages/toy-edit'
import { ToyDetails } from './pages/toy-details'

export default [
    {
        path: '/toy',
        component: ToyApp
    },
    {
        path: '/toy/edit/:toyId?',
        component: ToyEdit
    },
    {
        path: '/toy/:toyId',
        component: ToyDetails
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/',
        component: HomePage
    },
]