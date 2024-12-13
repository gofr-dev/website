export const blogListTransformer = (data) => {
  return data.map((item) => {
    const date = new Date(item.publishTime);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return {
      id: item.id,
      title: item.title,
      href: `/${item?.slug}`, // Assuming you want the slug as part of the URL
      description: item?.description,
      imageUrl: item?.imageURL?.imageUpload.url,
      date: formattedDate,
      datetime: date.toISOString().split('T')[0], // ISO format for datetime field
      category: [item.category.name], // Convert category to an array with a single string
      author: {
        name: item.author.name,
        role: 'Author', // Assuming a default role, as none is provided in `actual`
        imageUrl: item?.author?.profilePicURL,
      },
    };
  });
};
