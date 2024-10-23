import React from 'react'

const data = [
  {
    id: 1,
    name: 'Root 1',
    children: [
      {
        id: 2,
        name: 'Child 1',
        children: [
          { id: 4, name: 'Grandchild 1', children: [] },
          { id: 5, name: 'Grandchild 2', children: [] },
        ],
      },
      {
        id: 3,
        name: 'Child 2',
        children: [],
      },
    ],
  },
  {
    id: 6,
    name: 'Root 2',
    children: [],
  },
  {
    id: 7,
    name: 'Root 3',
    children: [],
  },
]

const TreeNode = ({ node }) => {
  return (
    <li>
      {node.id} {node.name}
      {node.children.length > 0 ? (
        <ul>
          {node.children.map((item) => (
            <TreeNode key={item?.id} node={item}></TreeNode>
          ))}
        </ul>
      ) : null}
    </li>
  )
}

const Tree = ({ data }) => {
  return (
    <ul>
      {data.map((item) => {
        return <TreeNode key={item?.id} node={item}></TreeNode>
      })}
    </ul>
  )
}

const Recursion = () => {
  return (
    <div>
      <Tree data={data}></Tree>
    </div>
  )
}

export default Recursion
