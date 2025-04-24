import React from 'react'

const CancellationAndRefunds = () => {
    return (
        <div className="max-w-3xl py-16 mx-auto p-6 bg-white  rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 my-4">Cancellation  Policy</h1>
            <ul className="list-disc pl-6 text-gray-600">
                <li>Orders once placed cannot be cancelled, as we begin processing immediately to ensure timely delivery.</li>
                <li>We request you to review your order carefully before confirming your purchase.</li>
                <li>For any other issues, feel free to reach out at superhelp@pvcu.in , we’re here to help wherever possible.</li>
            </ul>

            <h1 className="text-3xl font-bold text-gray-800 my-4">Refunds  Policy</h1>
            <ul className="list-disc pl-6 text-gray-600">
                <li>We currently do not offer refunds once an order is placed and processed.</li>
                <li>In case of a damaged or incorrect item, please contact us within 24 hours of delivery at superhelp@pvcu.in  with photos and order details.</li>
            </ul>
        </div>
    )
}

export default CancellationAndRefunds
