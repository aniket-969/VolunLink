export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Month is zero-based
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  return `${day}/${month}/${year}`;
}

export function formatUpdatedAt(updatedAt: string) {
  // console.log(updatedAt);

  const updatedAtDate = new Date(updatedAt);
  // console.log(updatedAtDate);

  const now = new Date();
  const diffMilliseconds = now.getTime() - updatedAtDate.getTime();

  const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

  // console.log(diffMinutes);

  if (diffMinutes < 1) {
    return "Just now";
  } else if (diffMinutes === 1) {
    return "1 minute ago";
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffMinutes < 1440) {
    // Less than 24 hours
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours} hours ago`;
  } else {
    const diffDays = Math.floor(diffMinutes / 1440);
    return `${diffDays} days ago`;
  }
}
