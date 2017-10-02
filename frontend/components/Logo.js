/**
 * Created by aelittaezugbaa on 14/09/2017.
 */
import React from 'react';

export default function Logo(props) {
  return (
    <a href={props.href} className="logo">{props.name}</a>
  )
}