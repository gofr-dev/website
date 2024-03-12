
export function mapWithIdsAndParentIds(data) {
    // Create a map to store nodes by their IDs
    const nodeMap = {};

    // Populate the node map with each node and its children
    data.forEach(node => {
        // Initialize an empty array for children
        node.children = [];

        // Store the node in the map using its ID as the key
        nodeMap[node.id] = node;
    });

    // Initialize an array to store the root nodes
    const rootNodes = [];

    // Iterate over the data again to build the tree structure
    data.forEach(node => {
        // If the node has a parent ID
        if (node.parentId) {
            // Get the parent node from the map
            const parent = nodeMap[node.parentId];

            // Add the current node as a child of its parent
            if (parent) {
                parent.children.push(node);
            }
        } else {
            // If the node has no parent ID, it's considered a root node
            rootNodes.push(node);
        }
    });

    // Return the root nodes
    return rootNodes;
}

// Example usage:

