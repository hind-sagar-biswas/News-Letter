const SubscriptionTable = ({ subscriptions, handleCancel, loading }) => {
  return (
    <table className="min-w-full border border-white/10 rounded-lg overflow-hidden text-white">
      <thead className="bg-gray-900 text-left text-white">
        <tr>
          <th className="p-4 border-b border-white/10">#</th>
          <th className="p-4 border-b border-white/10">Service Plan</th>
          <th className="p-4 border-b border-white/10">Price</th>
          <th className="p-4 border-b border-white/10">Updated At</th>
          <th className="p-4 border-b border-white/10">Transaction ID</th>
          <th className="p-4 border-b border-white/10">Action</th>
        </tr>
      </thead>
      <tbody>
        {subscriptions.length > 0 ? (
          subscriptions.map((sub, i) => (
            <tr key={sub._id} className="hover:bg-gray-800 transition-all">
              <td className="p-4 border-b border-white/10">{i + 1}</td>
              <td className="p-4 border-b border-white/10">{sub.servicePlan.title}</td>
              <td className="p-4 border-b border-white/10">{sub.price}</td>
              <td className="p-4 border-b border-white/10">
                {new Date(sub.createdAt).toLocaleDateString()}
              </td>
              <td className="p-4 border-b border-white/10">{sub.transactionId}</td>
              <td className="p-4 border-b border-white/10">
                <button
                  disabled={loading}
                  onClick={() => handleCancel(sub._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition cursor-pointer"
                >
                  {loading ? "Cancelling..." : "Cancel"}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={6}
              className="text-center p-6 text-gray-400"
            >
              No subscriptions found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SubscriptionTable;