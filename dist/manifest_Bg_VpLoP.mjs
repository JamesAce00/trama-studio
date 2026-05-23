import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_D5wa8Gk_.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/jack/Desktop/trama-studio/","adapterName":"","routes":[{"file":"file:///Users/jack/Desktop/trama-studio/dist/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/jack/Desktop/trama-studio/dist/blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/jack/Desktop/trama-studio/dist/glossario/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/glossario","isIndex":false,"type":"page","pattern":"^\\/glossario\\/?$","segments":[[{"content":"glossario","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/glossario.astro","pathname":"/glossario","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/jack/Desktop/trama-studio/dist/newsletter/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/newsletter","isIndex":false,"type":"page","pattern":"^\\/newsletter\\/?$","segments":[[{"content":"newsletter","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/newsletter.astro","pathname":"/newsletter","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/jack/Desktop/trama-studio/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/jack/Desktop/trama-studio/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/jack/Desktop/trama-studio/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/jack/Desktop/trama-studio/src/pages/glossario.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/glossario@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/jack/Desktop/trama-studio/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/jack/Desktop/trama-studio/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/jack/Desktop/trama-studio/src/pages/newsletter.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/glossario@_@astro":"pages/glossario.astro.mjs","\u0000@astro-page:src/pages/newsletter@_@astro":"pages/newsletter.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_Bg_VpLoP.mjs","/Users/jack/Desktop/trama-studio/src/content/blog/distretto-tessile-biella.md?astroContentCollectionEntry=true":"chunks/distretto-tessile-biella_BNCiBnge.mjs","/Users/jack/Desktop/trama-studio/src/content/blog/il-cotone-che-non-respira.md?astroContentCollectionEntry=true":"chunks/il-cotone-che-non-respira_DPhlKusk.mjs","/Users/jack/Desktop/trama-studio/src/content/blog/lana-merino-non-prude.md?astroContentCollectionEntry=true":"chunks/lana-merino-non-prude_C-TvuReO.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/calandratura.md?astroContentCollectionEntry=true":"chunks/calandratura_CwKp4ZBI.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/cimatura.md?astroContentCollectionEntry=true":"chunks/cimatura_Cvhws0RG.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/filato.md?astroContentCollectionEntry=true":"chunks/filato_Dk_-SzLc.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/finissaggio.md?astroContentCollectionEntry=true":"chunks/finissaggio_Cds1N9yZ.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/greige.md?astroContentCollectionEntry=true":"chunks/greige_DL4RHnUC.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/mano.md?astroContentCollectionEntry=true":"chunks/mano_CbrNjM4U.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/ordito.md?astroContentCollectionEntry=true":"chunks/ordito_DXtjpf03.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/ritorto.md?astroContentCollectionEntry=true":"chunks/ritorto_DMYzUEfH.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/tessuto-non-tessuto.md?astroContentCollectionEntry=true":"chunks/tessuto-non-tessuto_DwvI1QGM.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/trama.md?astroContentCollectionEntry=true":"chunks/trama_khv3SBpo.mjs","/Users/jack/Desktop/trama-studio/src/content/blog/distretto-tessile-biella.md?astroPropagatedAssets":"chunks/distretto-tessile-biella_C4hoR6Q1.mjs","/Users/jack/Desktop/trama-studio/src/content/blog/il-cotone-che-non-respira.md?astroPropagatedAssets":"chunks/il-cotone-che-non-respira_DtSVr-Fb.mjs","/Users/jack/Desktop/trama-studio/src/content/blog/lana-merino-non-prude.md?astroPropagatedAssets":"chunks/lana-merino-non-prude_ChVQqhGI.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/calandratura.md?astroPropagatedAssets":"chunks/calandratura_MhXPY71-.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/cimatura.md?astroPropagatedAssets":"chunks/cimatura_BOqzO6nv.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/filato.md?astroPropagatedAssets":"chunks/filato_srfYBVMN.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/finissaggio.md?astroPropagatedAssets":"chunks/finissaggio_2iY7jue-.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/greige.md?astroPropagatedAssets":"chunks/greige_BQopcd9G.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/mano.md?astroPropagatedAssets":"chunks/mano_6Xzuhxoj.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/ordito.md?astroPropagatedAssets":"chunks/ordito_CB3rFw0u.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/ritorto.md?astroPropagatedAssets":"chunks/ritorto_BOmDgMle.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/tessuto-non-tessuto.md?astroPropagatedAssets":"chunks/tessuto-non-tessuto_HX-iZJX-.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/trama.md?astroPropagatedAssets":"chunks/trama_BbkIJ6aZ.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","/Users/jack/Desktop/trama-studio/src/content/blog/distretto-tessile-biella.md":"chunks/distretto-tessile-biella_D1c6DOeT.mjs","/Users/jack/Desktop/trama-studio/src/content/blog/il-cotone-che-non-respira.md":"chunks/il-cotone-che-non-respira_D11SHi6y.mjs","/Users/jack/Desktop/trama-studio/src/content/blog/lana-merino-non-prude.md":"chunks/lana-merino-non-prude_4PcSeHzt.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/calandratura.md":"chunks/calandratura_DIjfczBw.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/cimatura.md":"chunks/cimatura_gpBi-Xv5.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/filato.md":"chunks/filato_H8NkpQi-.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/finissaggio.md":"chunks/finissaggio_XzyipBsv.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/greige.md":"chunks/greige_iE_eM6iV.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/mano.md":"chunks/mano_D6O3iGwd.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/ordito.md":"chunks/ordito_nqsevUKG.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/ritorto.md":"chunks/ritorto_BZ_kZPq8.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/tessuto-non-tessuto.md":"chunks/tessuto-non-tessuto_G4yEklGe.mjs","/Users/jack/Desktop/trama-studio/src/content/glossario/trama.md":"chunks/trama_DdMCNx2a.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.CTKyvsNm.js","/astro/hoisted.js?q=0":"_astro/hoisted.Da9fTCEx.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/file:///Users/jack/Desktop/trama-studio/dist/about/index.html","/file:///Users/jack/Desktop/trama-studio/dist/blog/index.html","/file:///Users/jack/Desktop/trama-studio/dist/glossario/index.html","/file:///Users/jack/Desktop/trama-studio/dist/newsletter/index.html","/file:///Users/jack/Desktop/trama-studio/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"aYjWrditAV+KVpG8yQKg9ZpJhbS7BUHBwkXlzg7oTqg=","experimentalEnvGetSecretEnabled":false});

export { manifest };
