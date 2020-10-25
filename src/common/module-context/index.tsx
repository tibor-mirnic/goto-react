import React, { FC, Context, createContext, useContext, useState, useReducer, Props } from 'react';
import { IModuleProps } from './module.props';

export const ModuleProvider = <S>(props: IModuleProps<S>): FC<IModuleProps<S>> => {

  const initialState = props.getInitialState();

  const reducer = props.getReducer();

  const [state, dispatch] = useReducer(reducer, initialState);

 
}