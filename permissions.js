const createResolver = (resolver) => {
  const baseResolver = resolver;
    baseResolver.createResolver = (childResolver) => {
      const newResolver = async (parent, args, context, info) => {
        // console.log("parent", parent);
        // console.log("args", args);
        // console.log("context", context);
        // console.log("info", info);
        await resolver(parent, args, context, info);
        return childResolver(parent, args, context, info);
      };
      return createResolver(newResolver);
    };
    return baseResolver;
  };
  
  export default createResolver((parent, args, context) => {
    // console.log("context.user", context.user === true );
    // console.log("context.id", context.id );
    // console.log("context", context );
    if (!context.user || !context.user.id) {
      throw new Error('Not authenticated');
    }
  });
  