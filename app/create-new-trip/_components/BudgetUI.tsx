import React from 'react'

export const SelectBudgetList = [
    {
        id: 1,
        title: 'Low',
        description: "Stay conscious of costs.",
        icon: '💰',
        color: 'bg-green-100 text-green-600'
    },
    {
        id: 2,
        title: 'Moderate',
        description: "Balance cost and comfort.",
        icon: '💵',
        color: 'bg-yellow-100 text-yellow-600'
    },
    {
        id: 3,
        title: 'High',
        description: "Indulge in luxury.",
        icon: '💎',
        color: 'bg-purple-100 text-purple-600'
    }
];

function BudgetUI({onSelectedOption}: any) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 gap-2 items-center mt-3 text-center">
        {SelectBudgetList.map((item, index) => (
            <div key={index} className="border p-3.5 rounded-2xl mb-3 cursor-pointer
            bg-white hover:border-primary hover:shadow-md transition-all flex flex-col items-center justify-center text-center"
            onClick={() => onSelectedOption(item.title + ": " + item.description)}>
                <div className={`text-3xl font-bold rounded-full p-3 ${item.color}`}>{item.icon}</div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
        ))}
    </div>
  )
}

export default BudgetUI