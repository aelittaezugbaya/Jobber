import React from 'react';

export default function Loading(props) {

  return (
    <div className="loading-wrapper">
      <div className={"preloader-wrapper active " + props.size}>
        <div className="spinner-layer spinner-yellow-only">
          <div className="circle-clipper left">
            <div className="circle"/>
          </div>
          <div className="gap-patch">
            <div className="circle"/>
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>
  )
}