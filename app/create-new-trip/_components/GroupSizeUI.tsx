import React from 'react'

export const SelectGroupSizeList = [
    {
        id: 1,
        title: 'Solo',
        description: 'Explore the world on your own.',
        icon: '👤',
        people: '1'
    },
    {
        id: 2,
        title: 'Couple',
        description: 'A romantic getaway for two.',
        icon: '❤️',
        people: '2'
    },
    {
        id: 3,
        title: 'Family',
        description: 'A fun-filled trip for the whole family.',
        icon: '👨‍👩‍👧‍👦',
        people: '3 to 5'
    },
    {
        id: 4,
        title: 'Friends',
        description: 'An exciting adventure with friends.',
        icon: '👫',
        people: '3 to 10'
    },
]

function GroupSizeUI({onSelectedOption}: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-3 text-center">
        {SelectGroupSizeList.map((item, index) => (
            <div key={index} className="border p-3.5 rounded-2xl mb-3 cursor-pointer 
            bg-white hover:border-primary hover:shadow-md transition-all"
            onClick={() => onSelectedOption(item.title + " (" + item.people + ")")}>
                <div className={"text-3xl font-bold rounded-full p-3"}>{item.icon}</div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
        ))}
    </div>
  )
}

export default GroupSizeUI