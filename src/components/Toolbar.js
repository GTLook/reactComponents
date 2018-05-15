import React from 'react'

const Toolbar = ({inbox, handleCheckBoxAll, handleMarkAsRead, handleMarkAsUnread, handleDelete, handleAddTag, handleRemoveTag }) => {

  const iconCheckAll = (inbox) => {
    if(inbox.every(obj => obj['selected'])) return "fa-check-square-o"
    if(inbox.every(obj => !obj['selected'])) return "fa-square-o"
    return "fa-minus-square-o"
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{ inbox.filter(obj => obj.read === false).length }</ span>
          unread messages
        </p>

        <a class="btn btn-danger">
          <i class="fa fa-plus"/>
        </a>

        <button className="btn btn-default" onClick={() => handleCheckBoxAll()}>
          <i
            className={["fa", iconCheckAll(inbox)].join(" ")}
          />
        </button>

        <button className="btn btn-default" onClick={() => handleMarkAsRead()}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick={() => handleMarkAsUnread()}>
          Mark As Unread
        </button>

        <select className="form-control label-select" onChange={(event) => handleAddTag(event.target.value)}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange={(event) => handleRemoveTag(event.target.value)}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={() => handleDelete()}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>

  )
}

export default Toolbar
