var __create = Object.create;
var __defProp = Object.defineProperty, __defProps = Object.defineProperties, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropDescs = Object.getOwnPropertyDescriptors, __getOwnPropNames = Object.getOwnPropertyNames, __getOwnPropSymbols = Object.getOwnPropertySymbols, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value, __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b))
      __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  return a;
}, __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b)), __markAsModule = (target) => __defProp(target, "__esModule", { value: !0 });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    __hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0 && (target[prop] = source[prop]);
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source))
      exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop) && (target[prop] = source[prop]);
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 == "object" || typeof module2 == "function")
    for (let key of __getOwnPropNames(module2))
      !__hasOwnProp.call(target, key) && (copyDefault || key !== "default") && __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  return target;
}, __toESM = (module2, isNodeMode) => __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: !0 } : { value: module2, enumerable: !0 })), module2), __toCommonJS = /* @__PURE__ */ ((cache) => (module2, temp) => cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp))(typeof WeakMap != "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/dist/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react"), import_server = require("react-dom/server"), import_styled_components = require("styled-components");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let sheet = new import_styled_components.ServerStyleSheet(), markup = (0, import_server.renderToString)(sheet.collectStyles(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }))), styles = sheet.getStyleTags();
  return markup = markup.replace("__STYLES__", styles), responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  default: () => App,
  loader: () => loader,
  meta: () => meta
});
var import_node = require("@remix-run/node"), import_react6 = require("@remix-run/react"), import_react_query = require("@tanstack/react-query");

// app/stores/useBottomSheetModalStore.ts
var import_zustand = __toESM(require("zustand")), useBottomSheetModalStore = (0, import_zustand.default)((set) => ({
  visible: !1,
  items: [],
  open(items) {
    set((prev) => __spreadProps(__spreadValues({}, prev), {
      visible: !0,
      items
    }));
  },
  close() {
    set((prev) => __spreadProps(__spreadValues({}, prev), {
      visible: !1
    }));
  }
}));

// app/components/system/BottomSheetModal.tsx
var import_framer_motion2 = require("framer-motion"), import_styled_components3 = __toESM(require("styled-components"));

// app/lib/colors.ts
var colors = {
  gray0: "#ECECEC",
  gray1: "#C6C6C6",
  gray2: "#A0A0A0",
  gray3: "#4B4B4B",
  gray4: "#2E2E2E",
  gray5: "#121212",
  primary: "#FFA000",
  secondary: "#FFF4E0",
  secondaryButtonText: "#e15500",
  destructive: "red"
};

// app/components/system/Overlay.tsx
var import_framer_motion = require("framer-motion"), import_styled_components2 = __toESM(require("styled-components"));
function Overlay({ visible, onClick }) {
  return /* @__PURE__ */ React.createElement(import_framer_motion.AnimatePresence, {
    initial: !1
  }, visible && /* @__PURE__ */ React.createElement(Fill, {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    onClick
  }));
}
var Fill = (0, import_styled_components2.default)(import_framer_motion.motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  height: -webkit-fill-available;
  background: rgba(0, 0, 0, 0.6);
`, Overlay_default = Overlay;

// app/components/system/BottomSheetModal.tsx
function BottomSheetModal({ visible, onClose, items }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Overlay_default, {
    visible,
    onClick: onClose
  }), /* @__PURE__ */ React.createElement(import_framer_motion2.AnimatePresence, null, visible && /* @__PURE__ */ React.createElement(Sheet, {
    initial: { y: "100%" },
    animate: { y: "0%" },
    exit: { y: "100%" },
    transition: {
      damping: 0
    }
  }, /* @__PURE__ */ React.createElement(Items, {
    onClick: onClose
  }, items.map((item) => /* @__PURE__ */ React.createElement(Item, {
    key: item.name,
    onClick: item.onClick
  }, item.name))))));
}
var Sheet = (0, import_styled_components3.default)(import_framer_motion2.motion.div)`
  position: fixed;
  background: white;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`, Items = import_styled_components3.default.div`
  display: flex;
  flex-direction: column;
`, Item = import_styled_components3.default.div`
  padding: 16px;
  color: ${colors.gray5};
`, BottomSheetModal_default = BottomSheetModal;

// app/components/system/GlobalBottomSheetModal.tsx
function GlobalBottomSheetModal() {
  let { visible, items, close } = useBottomSheetModalStore();
  return /* @__PURE__ */ React.createElement(BottomSheetModal_default, {
    items,
    visible,
    onClose: close
  });
}
var GlobalBottomSheetModal_default = GlobalBottomSheetModal;

// app/contexts/DialogContext.tsx
var import_react4 = require("react");

// app/components/system/Dialog.tsx
var import_styled_components7 = __toESM(require("styled-components"));

// app/components/system/Button.tsx
var import_react2 = require("@remix-run/react"), import_react3 = require("react"), import_styled_components5 = __toESM(require("styled-components"));

// app/lib/styles.ts
var import_styled_components4 = require("styled-components"), hover = (styles) => import_styled_components4.css`
  @media (hover: hover) {
    &:hover:not([disabled]) {
      ${styles}
    }
  }
`;

// app/components/system/Button.tsx
var Button = (0, import_react3.forwardRef)((_a, ref) => {
  var _b = _a, { layoutMode = "inline", variant = "primary", size = "medium", to } = _b, rest = __objRest(_b, ["layoutMode", "variant", "size", "to"]);
  return to ? /* @__PURE__ */ React.createElement(StyledLink, {
    layoutMode,
    variant,
    size,
    to,
    className: rest.className,
    style: rest.style,
    ref
  }, rest.children) : /* @__PURE__ */ React.createElement(StyledButton, __spreadValues({
    layoutMode,
    variant,
    size,
    ref
  }, rest));
});
Button.displayName = "Button";
var variantStyles = {
  primary: import_styled_components5.css`
    background: ${colors.primary};
    color: white;
    ${hover(import_styled_components5.css`
      opacity: 0.875;
    `)}
  `,
  secondary: import_styled_components5.css`
    background: ${colors.secondary};
    color: ${colors.secondaryButtonText};
    ${hover(import_styled_components5.css`
      opacity: 0.875;
    `)}
  `,
  text: import_styled_components5.css`
    background: transparent;
    color: ${colors.gray4};
    ${hover(`background: ${colors.gray0};`)}
  `
}, sizeStyles = {
  small: import_styled_components5.css`
    height: 36px;
    font-size: 14px;
    padding-left: 12px;
    padding-right: 12px;
  `,
  medium: import_styled_components5.css`
    height: 48px;
    font-size: 16px;
    padding-left: 16px;
    padding-right: 16px;
  `
}, sharedStyles = import_styled_components5.css`
  display: flex;
  ${(props) => variantStyles[props.variant]}
  ${(props) => sizeStyles[props.size]}
  border: none;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 4px;
  transition: filter 0.25s ease-in-out;
  cursor: pointer;

  &:disabled {
    filter: grayscale(0.6);
  }

  ${(props) => props.layoutMode === "fullWidth" && import_styled_components5.css`
      width: 100%;
    `}
`, StyledButton = import_styled_components5.default.button`
  ${sharedStyles}
`, StyledLink = (0, import_styled_components5.default)(import_react2.Link)`
  ${sharedStyles}
  text-decoration: none;
`, Button_default = Button;

// app/components/system/Modal.tsx
var import_framer_motion3 = require("framer-motion"), import_styled_components6 = __toESM(require("styled-components"));
function Modal({ className, children, visible }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Overlay_default, {
    visible
  }), /* @__PURE__ */ React.createElement(Positioner, null, /* @__PURE__ */ React.createElement(import_framer_motion3.AnimatePresence, null, visible && /* @__PURE__ */ React.createElement(Block, {
    initial: { y: "30vh", opacity: 0 },
    animate: { y: "0vh", opacity: 1 },
    exit: { y: "30vh", opacity: 0 },
    transition: { type: "spring", bounce: 0.33 },
    className
  }, children))));
}
var Positioner = import_styled_components6.default.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`, Block = (0, import_styled_components6.default)(import_framer_motion3.motion.div)`
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`, Modal_default = Modal;

// app/components/system/Dialog.tsx
function Dialog({
  visible,
  title,
  description,
  cancelText,
  confirmText,
  onClose,
  onConfirm,
  mode = "OK"
}) {
  return /* @__PURE__ */ React.createElement(StyledModal, {
    visible
  }, /* @__PURE__ */ React.createElement(Title, null, title), /* @__PURE__ */ React.createElement(Description, null, description), /* @__PURE__ */ React.createElement(Footer, null, mode === "YESNO" && /* @__PURE__ */ React.createElement(Button_default, {
    variant: "secondary",
    onClick: onClose
  }, cancelText ?? "\uB2EB\uAE30"), /* @__PURE__ */ React.createElement(Button_default, {
    onClick: onConfirm
  }, confirmText ?? "\uD655\uC778")));
}
var StyledModal = (0, import_styled_components7.default)(Modal_default)`
  width: 375px;
  max-width: calc(100vw - 32px);
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 16px;
  padding-right: 16px;
`, Title = import_styled_components7.default.h3`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.gray5};
  line-height: 1.5;
`, Description = import_styled_components7.default.p`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  color: ${colors.gray4};
  line-height: 1.5;
  white-space: pre-wrap;
  margin-bottom: 24px;
`, Footer = import_styled_components7.default.section`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`, Dialog_default = Dialog;

// app/contexts/DialogContext.tsx
var DialogContext = (0, import_react4.createContext)(null);
function DialogProvider({ children }) {
  let [visible, setVisible] = (0, import_react4.useState)(!1), [config, setConfig] = (0, import_react4.useState)(null), open = (0, import_react4.useCallback)((config2) => {
    setVisible(!0), setConfig(config2);
  }, []), close = (0, import_react4.useCallback)(() => {
    var _a;
    (_a = config == null ? void 0 : config.onClose) == null || _a.call(config), setVisible(!1);
  }, [config]), confirm = (0, import_react4.useCallback)(() => {
    var _a;
    (_a = config == null ? void 0 : config.onConfirm) == null || _a.call(config), setVisible(!1);
  }, [config]), value = { open };
  return /* @__PURE__ */ React.createElement(DialogContext.Provider, {
    value
  }, children, /* @__PURE__ */ React.createElement(Dialog_default, {
    visible,
    title: (config == null ? void 0 : config.title) ?? "",
    description: (config == null ? void 0 : config.description) ?? "",
    cancelText: config == null ? void 0 : config.cancelText,
    confirmText: config == null ? void 0 : config.confirmText,
    onClose: close,
    onConfirm: confirm,
    mode: (config == null ? void 0 : config.mode) ?? "OK"
  }));
}
function useDialog() {
  let context = (0, import_react4.useContext)(DialogContext);
  if (!context)
    throw new Error("useDialog must be used within a DialogProvider");
  return context;
}

// app/GlobalStyle.tsx
var import_styled_components8 = require("styled-components"), GlobalStyle = import_styled_components8.createGlobalStyle`
  
  html {
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
  body {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    margin: 0;
  }
  button, input {
    font-family: inherit;
  }
  button {
    padding: 0;
    background: none;
    border: none;
    outline: none;
  }
`, GlobalStyle_default = GlobalStyle;

// app/lib/client.ts
var import_qs = __toESM(require("qs")), _cookie = "";
function setClientCookie(cookie) {
  _cookie = cookie;
}
var FetchError = class extends Error {
  constructor(response, data) {
    super(`Fetch failed with status ${response.status}`);
    this.response = response;
    this.data = data;
  }
};
async function rejectIfNeeded(response) {
  if (!response.ok) {
    let data = await response.json();
    throw new FetchError(response, data);
  }
  return response;
}
var fetchClient = {
  baseUrl: "http://localhost:8080",
  async get(url, config = {}) {
    let query = (config == null ? void 0 : config.params) ? import_qs.default.stringify(config == null ? void 0 : config.params, { addQueryPrefix: !0 }) : "", response = await fetch(this.baseUrl.concat(url, query), {
      method: "GET",
      credentials: "include",
      headers: __spreadValues({
        "Content-Type": "application/json",
        Cookie: _cookie
      }, (config == null ? void 0 : config.headers) ?? {})
    });
    await rejectIfNeeded(response);
    let data = await response.json(), { headers } = response;
    return {
      data,
      headers
    };
  },
  async post(url, body, config = {}) {
    let response = await fetch(this.baseUrl.concat(url), {
      method: "POST",
      credentials: "include",
      headers: __spreadValues({
        "Content-Type": "application/json",
        Cookie: _cookie
      }, config.headers ?? {}),
      signal: config.signal,
      body: body ? JSON.stringify(body) : void 0
    });
    await rejectIfNeeded(response);
    let data = await response.json(), { headers } = response;
    return {
      data,
      headers
    };
  },
  async patch(url, body, config = {}) {
    let response = await fetch(this.baseUrl.concat(url), {
      method: "PATCH",
      credentials: "include",
      headers: __spreadValues({
        "Content-Type": "application/json",
        Cookie: _cookie
      }, config.headers ?? {}),
      signal: config.signal,
      body: JSON.stringify(body)
    });
    await rejectIfNeeded(response);
    let data = await response.json(), { headers } = response;
    return {
      data,
      headers
    };
  },
  async delete(url, config = {}) {
    let response = await fetch(this.baseUrl.concat(url), {
      method: "DELETE",
      credentials: "include",
      headers: __spreadValues({
        "Content-Type": "application/json",
        Cookie: _cookie
      }, config.headers ?? {}),
      signal: config.signal
    });
    await rejectIfNeeded(response);
    let data = await response.json(), { headers } = response;
    return {
      data,
      headers
    };
  }
};

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/root.tsx
var import_sangte2 = require("sangte");

// app/states/user.ts
var import_sangte = require("sangte"), userState = (0, import_sangte.sangte)(null);
function useUser() {
  return (0, import_sangte.useSangteValue)(userState);
}
function useSetUser() {
  return (0, import_sangte.useSetSangte)(userState);
}

// app/lib/api/auth.ts
async function register(params) {
  let response = await fetchClient.post("/api/auth/register", params);
  return { result: response.data, headers: response.headers };
}
async function login(params) {
  let response = await fetchClient.post("/api/auth/login", params);
  return { result: response.data, headers: response.headers };
}
async function logout() {
  return fetchClient.post("/api/auth/logout");
}
async function getMyAccount(accessToken) {
  return (await fetchClient.get("/api/me", {
    headers: accessToken ? {
      Authorization: `Bearer ${accessToken}`
    } : {}
  })).data;
}
async function refreshToken() {
  let response = await fetchClient.post("/api/auth/refresh", {}), tokens = response.data;
  return {
    headers: response.headers,
    tokens
  };
}

// app/lib/applyAuth.ts
function applyAuth(request) {
  let cookie = request.headers.get("Cookie");
  return !cookie || !cookie.includes("access_token") ? !1 : (setClientCookie(cookie), !0);
}

// app/lib/nextError.ts
var import_react5 = require("@remix-run/react");
function isNextError(e) {
  return (e == null ? void 0 : e.statusCode) !== void 0 && (e == null ? void 0 : e.message) !== void 0 && (e == null ? void 0 : e.name) !== void 0;
}
function extractNextError(e) {
  if (e instanceof FetchError) {
    let data = e.data;
    if (isNextError(data))
      return data;
  }
  return {
    statusCode: 500,
    message: "Unknown error",
    name: "Unknown"
  };
}
function useNextAppErrorCatch() {
  return (0, import_react5.useCatch)();
}

// app/lib/protectRoute.ts
var getMyAccountPromise = null;
async function getMyAccountWithRefresh() {
  var _a;
  try {
    return {
      me: await getMyAccount(),
      headers: null
    };
  } catch (e) {
    let error = extractNextError(e);
    if (error.name === "Unauthorized" && ((_a = error.payload) == null ? void 0 : _a.isExpiredToken))
      try {
        let { tokens, headers } = await refreshToken();
        return setClientCookie(`access_token=${tokens.accessToken}`), {
          me: await getMyAccount(),
          headers
        };
      } catch {
        throw e;
      }
    throw e;
  }
}
async function getMemoMyAccount() {
  return getMyAccountPromise || (getMyAccountPromise = getMyAccountWithRefresh()), getMyAccountPromise;
}
var checkIsLoggedIn = async (request) => {
  if (!applyAuth(request))
    return !1;
  try {
    await getMemoMyAccount();
  } catch (e) {
    return console.log({ e }), !1;
  }
  return !0;
};

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/root.tsx
var loader = async ({ request, context }) => {
  let cookie = request.headers.get("Cookie");
  if (!cookie)
    return null;
  setClientCookie(cookie);
  try {
    let { me, headers } = await getMemoMyAccount();
    return (0, import_node.json)(me, headers ? { headers } : void 0);
  } catch {
    return (0, import_node.json)(null);
  }
}, meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
}), queryClient = new import_react_query.QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 5
    }
  }
});
function App() {
  let data = (0, import_react6.useLoaderData)();
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react6.Meta, null), /* @__PURE__ */ React.createElement(import_react6.Links, null), typeof document > "u" ? "__STYLES__" : null), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_sangte2.SangteProvider, {
    initialize: ({ set }) => {
      set(userState, data);
    }
  }, /* @__PURE__ */ React.createElement(GlobalStyle_default, null), /* @__PURE__ */ React.createElement(import_react_query.QueryClientProvider, {
    client: queryClient
  }, /* @__PURE__ */ React.createElement(DialogProvider, null, /* @__PURE__ */ React.createElement(import_react6.Outlet, null)), /* @__PURE__ */ React.createElement(GlobalBottomSheetModal_default, null)), /* @__PURE__ */ React.createElement(import_react6.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react6.Scripts, null), /* @__PURE__ */ React.createElement(import_react6.LiveReload, null))));
}
function CatchBoundary() {
}

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/items/$itemId.tsx
var itemId_exports = {};
__export(itemId_exports, {
  default: () => itemId_default,
  loader: () => loader2
});
var import_node2 = require("@remix-run/node"), import_react25 = require("@remix-run/react"), import_styled_components28 = __toESM(require("styled-components"));

// app/components/base/MoreVertButton.tsx
var import_styled_components9 = __toESM(require("styled-components"));

// app/components/vectors/ArrowLeft.tsx
var React2 = __toESM(require("react")), SvgArrowLeft = (props) => /* @__PURE__ */ React2.createElement("svg", __spreadValues({
  width: 24,
  height: 24,
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React2.createElement("path", {
  d: "M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11h12Z",
  fill: "currentColor"
})), ArrowLeft_default = SvgArrowLeft;

// app/components/vectors/Bookmark.tsx
var React3 = __toESM(require("react")), SvgBookmark = (props) => /* @__PURE__ */ React3.createElement("svg", __spreadValues({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React3.createElement("path", {
  d: "M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2Z",
  fill: "currentColor"
})), Bookmark_default = SvgBookmark;

// app/components/vectors/BookmarkOutline.tsx
var React4 = __toESM(require("react")), SvgBookmarkOutline = (props) => /* @__PURE__ */ React4.createElement("svg", __spreadValues({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, props), /* @__PURE__ */ React4.createElement("path", {
  d: "m17 18-5-2.18L7 18V5h10m0-2H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2Z",
  fill: "currentColor"
})), BookmarkOutline_default = SvgBookmarkOutline;

// app/components/vectors/Calendar.tsx
var React5 = __toESM(require("react")), SvgCalendar = (props) => /* @__PURE__ */ React5.createElement("svg", __spreadValues({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React5.createElement("path", {
  d: "M22 3.667V22H2V3.667h2.5V4.5c0 .92.747 1.667 1.667 1.667.919 0 1.666-.748 1.666-1.667v-.833h8.334V4.5c0 .92.747 1.667 1.666 1.667.92 0 1.667-.748 1.667-1.667v-.833H22Zm-1.667 5H3.667v11.666h16.666V8.667Zm-1.666-5.834a.833.833 0 1 0-1.667 0V4.5a.833.833 0 1 0 1.667 0V2.833ZM7 4.5a.833.833 0 1 1-1.667 0V2.833a.833.833 0 1 1 1.667 0V4.5Zm5.572 11.235c0-.668-.348-1.19-.924-1.412.44-.22.697-.673.697-1.253 0-1.122-1.093-1.79-2.15-1.79-1.232 0-2.16.77-2.217 2.302H9.35c-.011-.635.226-1.096.854-1.096.375 0 .778.226.778.724 0 .628-.68.718-1.306.664v1.067c.89 0 1.42.056 1.42.82 0 .604-.457.874-.91.874-.684 0-.965-.512-.99-1.21h-1.36c-.027 1.577.927 2.408 2.368 2.408 1.285 0 2.37-.785 2.37-2.098Zm3.595 2.098v-6.431h-1.16c-.144.961-.83 1.242-1.81 1.216v1.121h1.544v4.094h1.426Z",
  fill: "currentColor"
})), Calendar_default = SvgCalendar;

// app/components/vectors/Globe.tsx
var React6 = __toESM(require("react")), SvgGlobe = (props) => /* @__PURE__ */ React6.createElement("svg", __spreadValues({
  width: 24,
  height: 24,
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React6.createElement("path", {
  d: "M12.953 8.81c-.029-.056.285-.086.341-.086.062.008-.163.377-.34.085ZM11.16 6.25l.09-.027c.053.046-.06.08-.043.114.072.129.018.206.007.276-.011.071-.087.04-.124.078-.044.055.215.062.218.07.01.028-.312.075-.253.143.08.114.687-.162.59-.146.188-.095.024-.105-.08-.159-.037-.179-.067-.456-.178-.567l.073-.085c-.172-.249-.3.302-.3.302ZM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12C2 6.478 6.477 2 12 2s10 4.478 10 10Zm-6.925-4.476c-.005-.122-.158-.237-.318-.026-.113.145-.093.366-.154.465-.086.145.473.282.473.144.02-.23.61-.052.725-.02.207.057.536-.189.176-.318-.296-.108-.452-.224-.479-.436 0 0 .157-.146.089-.138-.182.022-.512.655-.512.33ZM20.322 12c0-.863-.148-1.733-.298-2.193a.51.51 0 0 0-.299-.315c-.213-.084-1.114.497-1.25.211-.09-.19-.27.122-.477.007-.1-.055-.378-.43-.504-.383-.257.092.395.803.573.896.168-.126.71-.387.827-.031.224.67-.614 1.404-1.042 1.79-.64.579-.52-.374-.956-.71-.23-.175-.227-.55-.459-.679-.103-.058-.577-.604-.573-.677l-.014.138c-.078.06-.245-.223-.262-.267 0 .245.4.637.532.834.226.337.347.829.623 1.105.149.148.715.761.863.748.16-.014.669-.382.759-.36.537.126-1.263 2.67-1.434 2.985-.141.264.115.918.094 1.23-.024.361-.308.478-.577.674-.289.211-.221.621-.464.771-.43.265-.74 1.128-1.352 1.123-.18 0-.95.3-1.051.006-.079-.213-.183-.375-.294-.585-.109-.207-.013-.421-.145-.604-.09-.127-.395-.414-.423-.564-.002-.13.098-.522.234-.59.19-.098.036-.382.013-.547-.04-.295-.223-.538-.442-.709-.324-.249-.156-.447-.08-.803 0-.17-.104-.393-.332-.327-.47.137-.328-.367-.67-.344-.247.018-.449.174-.678.243-.288.087-.583-.068-.868-.104-1.173-.148-1.555-1.488-1.25-2.455.031-.158-.094-.451-.04-.574.132-.293.4-.622.636-.845.131-.125.3-.093.455-.19.24-.152.243-.462.477-.652.334-.27.789-.265 1.224-.323.231-.03 1.113-.222 1.252-.05 0 .032.16.503-.016.477.361.019.875.624 1.218.482.175-.073.111-.613.472-.352.219.156 1.197.226 1.4.057.125-.103.195-.775.043-.85.097.095-.509.103-.565.081-.1-.037-.194.095-.354.02.096.047-.539-.294-.182-.555-.15.11-.289-.03-.45.09-.11.09.052.15-.106.227-.252.128-.442-.437-.537-.501-.096-.063-.845-.588-.641-.246l.657.654c-.032.021-.172-.238-.172-.049.044-.112.016.483-.087.29-.046-.075.075-.117.005-.224 0-.071-.19-.14-.227-.188-.104-.13-.38-.415-.53-.483-.042-.02-.637.073-.687.092a1.482 1.482 0 0 0-.15.259c-.123.046-.239.105-.348.178l-.131.294c-.057.051-.638.243-.641.25.024-.062-.406-.142-.378-.267.032-.138.178-.567.14-.723-.04-.165.895.236.955-.196.025-.188.039-.406-.26-.438.056.007.579-.205.665-.3.122-.14.401-.368.604-.368.236 0 .186-.344.295-.513.109.044-.059.314.072.423-.008-.086.371.047.408.027.086-.045.57-.018.495-.245-.084-.23.042-.162.15-.21-.018.007.284-.516.335-.345-.035-.176-.35.062-.46.053-.255-.02-.147-.433-.051-.554.074-.096-.203-.214-.206-.03-.005.274-.26.522-.2.886.09.55-.613-.132-.675-.095-.233.142-.424-.178-.303-.37.123-.196.42-.186.543-.396.087-.149.188-.321.32-.434.447-.374.57-.075 1.014-.034.434.04.147.104.087.27-.058.159.238.215.34.083.059-.077.192-.27.249-.412.074-.185.75-.164.278-.447-.311-.186-1.67-.56-2.58-.56-.196 0-.334.22-.484.344-.296.245-1.056.728-1.479.581-.432-.149-1.358.55-1.507.555-.054.004.004-.528.299-.567-.128.019 1.039-.59 1.007-.716-.038-.15-2.332.685-2.23.853.05.076.25.076-.013.244-.15.091-.31.668-.451.668-.42.184-.447-.363-.916.34l-.745.3a8.3 8.3 0 0 0-2.15 4.32c-.01.066.278.188.316.233.093.112.093.594.14.751.114.399.398.62.616.983.128.216.341.761.274.988.09-.148.892.68 1.038.852.345.405.611.897.051 1.299-.18.13.275.94.04 1.14l-.3.077c-.297.183-.163.63.017.819A8.324 8.324 0 0 0 20.32 12Zm-9.59-5.298c.105-.045.245-.044.26-.183.012-.123.036-.038.066-.083.03-.044-.056-.115-.091-.122-.054-.011-.09.058-.125.087l-.06.016-.056.072.006.04-.072.088c-.07.07.002.116.072.085Z",
  fill: "currentColor"
})), Globe_default = SvgGlobe;

// app/components/vectors/HeartFill.tsx
var React7 = __toESM(require("react")), SvgHeartFill = (props) => /* @__PURE__ */ React7.createElement("svg", __spreadValues({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React7.createElement("path", {
  d: "M12 5.863c-1.658-4.5-10-3.831-10 2.973 0 3.39 2.55 7.9 10 12.497 7.45-4.596 10-9.107 10-12.497 0-6.765-8.333-7.5-10-2.973Z",
  fill: "currentColor"
})), HeartFill_default = SvgHeartFill;

// app/components/vectors/HeartOutline.tsx
var React8 = __toESM(require("react")), SvgHeartOutline = (props) => /* @__PURE__ */ React8.createElement("svg", __spreadValues({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React8.createElement("path", {
  d: "M12 9.857c.195-.933 1.29-5.19 4.485-5.19 1.85 0 3.848 1.292 3.848 4.169 0 3.256-3.022 7.058-8.333 10.524-5.31-3.466-8.333-7.268-8.333-10.524 0-2.904 1.974-4.171 3.814-4.171 3.269 0 4.287 4.272 4.519 5.192ZM2 8.836c0 3.39 2.55 7.9 10 12.497 7.45-4.596 10-9.107 10-12.497 0-6.635-8.04-7.524-10-3.114C10.052 1.337 2 2.163 2 8.836Z",
  fill: "currentColor"
})), HeartOutline_default = SvgHeartOutline;

// app/components/vectors/Home.tsx
var React9 = __toESM(require("react")), SvgHome = (props) => /* @__PURE__ */ React9.createElement("svg", __spreadValues({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React9.createElement("path", {
  d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z",
  fill: "currentColor"
})), Home_default = SvgHome;

// app/components/vectors/Logo.tsx
var React10 = __toESM(require("react")), SvgLogo = (props) => /* @__PURE__ */ React10.createElement("svg", __spreadValues({
  viewBox: "0 0 84 17",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React10.createElement("path", {
  d: "M10.584 4.504 8.136 16H2.472L0 4.504h4.224l1.032 7.368h.312l1.104-7.368h3.912Zm5.53 3.144c-.416 0-.688.144-.816.432-.128.272-.192.696-.192 1.272h2.088v-.576c0-.752-.36-1.128-1.08-1.128Zm.096-3.432c1.648 0 2.824.4 3.528 1.2.72.784 1.08 1.912 1.08 3.384 0 .192-.056 1.056-.168 2.592h-5.472c0 1.2.552 1.8 1.656 1.8.528 0 1.56-.184 3.096-.552l.336 2.976a13.573 13.573 0 0 1-4.032.624c-1.648 0-2.912-.536-3.792-1.608-.88-1.088-1.32-2.56-1.32-4.416 0-4 1.696-6 5.088-6Zm5.72 9.144V.616h3.96v11.472c0 .272.057.464.169.576.128.112.344.168.648.168l-.312 3.408h-1.32c-1.056 0-1.848-.216-2.376-.648-.512-.448-.768-1.192-.768-2.232Zm12.083 2.664c-1.184.144-2.216.216-3.096.216-.865 0-1.545-.224-2.04-.672-.48-.464-.72-1.256-.72-2.376V7.624h-1.152V4.648h1.344l.215-2.208h3.624v2.208h2.136l-.167 2.976h-1.992V12.4c0 .336.16.504.48.504.031 0 .527-.024 1.487-.072l-.12 3.192Zm5.12-6.48V16H35.15V4.504h3.504l.24.696h.096c.368-.416.736-.68 1.104-.792.384-.128 1-.192 1.848-.192l-.168 3.84H40.67c-.624 0-1.04.096-1.248.288-.192.192-.288.592-.288 1.2Zm8.34-1.896c-.416 0-.688.144-.816.432-.128.272-.192.696-.192 1.272h2.088v-.576c0-.752-.36-1.128-1.08-1.128Zm.096-3.432c1.648 0 2.824.4 3.528 1.2.72.784 1.08 1.912 1.08 3.384 0 .192-.056 1.056-.168 2.592h-5.472c0 1.2.552 1.8 1.656 1.8.528 0 1.56-.184 3.096-.552l.336 2.976a13.573 13.573 0 0 1-4.032.624c-1.648 0-2.912-.536-3.792-1.608-.88-1.088-1.32-2.56-1.32-4.416 0-4 1.696-6 5.088-6Zm9.73 1.128c.88-.752 1.847-1.128 2.903-1.128s1.792.248 2.208.744c.432.48.648 1.208.648 2.184V16h-4.08V8.512c0-.4-.176-.6-.528-.6-.448 0-.824.112-1.128.336V16H53.29V4.504h3.672l.24.84h.096Zm17.37 10.8-1.608.096c-1.232 0-1.984-.408-2.256-1.224h-.12c-.528.816-1.336 1.224-2.424 1.224-1.44 0-2.456-.504-3.048-1.512-.576-1.008-.864-2.504-.864-4.488 0-2 .328-3.504.984-4.512.656-1.008 1.6-1.512 2.832-1.512.848 0 1.504.2 1.968.6v-4.2h4.008v11.856c0 .304.064.512.192.624.128.096.36.144.696.144l-.36 2.904ZM69.221 7.6c-.336 0-.56.208-.672.624-.112.4-.168.984-.168 1.752 0 .752.008 1.264.024 1.536s.048.552.096.84c.064.272.152.464.264.576.128.096.328.144.6.144.288 0 .584-.072.888-.216V7.888a2.056 2.056 0 0 0-1.032-.288Zm6.086.312c0-1.168.352-2.072 1.056-2.712.72-.656 1.704-.984 2.952-.984s2.512.16 3.792.48l-.408 3.336c-1.632-.368-2.728-.552-3.288-.552-.336 0-.504.136-.504.408 0 .176.184.336.552.48 1.28.464 2.24.992 2.88 1.584.656.592.984 1.48.984 2.664 0 1.184-.304 2.088-.912 2.712-.608.608-1.544.912-2.808.912-1.248 0-2.496-.16-3.744-.48l.264-3.24c1.6.432 2.632.648 3.096.648.48 0 .72-.112.72-.336 0-.224-.176-.4-.528-.528-1.424-.544-2.464-1.12-3.12-1.728-.656-.624-.984-1.512-.984-2.664Z",
  fill: "currentColor"
})), Logo_default = SvgLogo;

// app/components/vectors/MoreVert.tsx
var React11 = __toESM(require("react")), SvgMoreVert = (props) => /* @__PURE__ */ React11.createElement("svg", __spreadValues({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React11.createElement("path", {
  d: "M10.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.5 19a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.5 5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z",
  fill: "currentColor"
})), MoreVert_default = SvgMoreVert;

// app/components/vectors/PlusCircle.tsx
var React12 = __toESM(require("react")), SvgPlusCircle = (props) => /* @__PURE__ */ React12.createElement("svg", __spreadValues({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React12.createElement("path", {
  d: "M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm0-18a10 10 0 1 0 0 20 10 10 0 0 0 0-20m1 5h-2v4H7v2h4v4h2v-4h4v-2h-4V7Z",
  fill: "currentColor"
})), PlusCircle_default = SvgPlusCircle;

// app/components/vectors/Search.tsx
var React13 = __toESM(require("react")), SvgSearch = (props) => /* @__PURE__ */ React13.createElement("svg", __spreadValues({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React13.createElement("path", {
  d: "M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16a6.5 6.5 0 1 1 0-13m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z",
  fill: "currentColor"
})), Search_default = SvgSearch;

// app/components/vectors/Setting.tsx
var React14 = __toESM(require("react")), SvgSetting = (props) => /* @__PURE__ */ React14.createElement("svg", __spreadValues({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React14.createElement("path", {
  d: "M12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z",
  fill: "currentColor"
})), Setting_default = SvgSetting;

// app/components/vectors/SpeechBubble.tsx
var React15 = __toESM(require("react")), SvgSpeechBubble = (props) => /* @__PURE__ */ React15.createElement("svg", __spreadValues({
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React15.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M14.667 12.445H13v2.222l-2.963-2.222h-4.26v-2.222H6.89v1.11h3.518l1.482 1.112v-1.111h1.667V6.889h-1.111V5.778h2.222v6.667ZM5.963 9.112 3 11.334V9.112H1.333V1.333h10v7.779h-5.37ZM2.444 8h1.667v1.112L5.593 8h4.63V2.445H2.443V8Z",
  fill: "#4B4B4B"
})), SpeechBubble_default = SvgSpeechBubble;

// app/components/vectors/Spinner.tsx
var React16 = __toESM(require("react")), SvgSpinner = (props) => /* @__PURE__ */ React16.createElement("svg", __spreadValues({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React16.createElement("path", {
  d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10h-2a8 8 0 1 1-8-8V2Z",
  fill: "currentColor"
})), Spinner_default = SvgSpinner;

// app/components/vectors/Time.tsx
var React17 = __toESM(require("react")), SvgTime = (props) => /* @__PURE__ */ React17.createElement("svg", __spreadValues({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React17.createElement("path", {
  d: "M13 11.94V7h-2v6l4.017 2.727 1.123-1.655L13 11.94Z",
  fill: "currentColor"
}), /* @__PURE__ */ React17.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",
  fill: "currentColor"
})), Time_default = SvgTime;

// app/components/vectors/Trending.tsx
var React18 = __toESM(require("react")), SvgTrending = (props) => /* @__PURE__ */ React18.createElement("svg", __spreadValues({
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /* @__PURE__ */ React18.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M8.688 2C9.195 7.99 4 10.053 4 15.33c0 3.584 2.558 6.643 7.5 6.67 4.942.026 7.5-3.678 7.5-7.463 0-3.451-1.718-6.705-4.96-8.729.77 2.173-.255 4.157-1.25 4.84.058-2.78-.938-6.907-4.102-8.648Zm3.925 10.833c3.13 3.324 1.208 7.5-1.306 7.5-1.529 0-2.315-1.054-2.307-2.147.016-2.028 2.28-2.03 3.613-5.353Z",
  fill: "currentColor"
})), Trending_default = SvgTrending;

// app/components/vectors/User.tsx
var React19 = __toESM(require("react")), SvgUser = (props) => /* @__PURE__ */ React19.createElement("svg", __spreadValues({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, props), /* @__PURE__ */ React19.createElement("path", {
  fill: "currentColor",
  d: "M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
})), User_default = SvgUser;

// app/components/base/MoreVertButton.tsx
function MoreVertButton({ onClick }) {
  return /* @__PURE__ */ React.createElement(StyledButton2, {
    onClick
  }, /* @__PURE__ */ React.createElement(MoreVert_default, null));
}
var StyledButton2 = import_styled_components9.default.button`
  margin-right: -8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray5};
  svg {
    width: 24px;
    height: 24px;
  }
`, MoreVertButton_default = MoreVertButton;

// app/components/items/CommentInputOverlay.tsx
var import_framer_motion4 = require("framer-motion"), import_styled_components11 = __toESM(require("styled-components"));

// app/stores/useCommentInputStore.ts
var import_zustand2 = __toESM(require("zustand")), useCommentInputStore = (0, import_zustand2.default)((set) => ({
  visible: !1,
  parentCommentId: null,
  commentId: null,
  defaultText: "",
  write: (parentCommentId = null) => set((store) => __spreadProps(__spreadValues({}, store), { parentCommentId, visible: !0 })),
  edit: (commentId, defaultText) => set((store) => __spreadProps(__spreadValues({}, store), { commentId, defaultText, visible: !0 })),
  close: () => set((store) => __spreadProps(__spreadValues({}, store), { visible: !1, commentId: null, defaultText: "" }))
}));

// app/components/items/CommentInputOverlay.tsx
var import_react8 = require("react");

// app/hooks/useItemId.ts
var import_react7 = require("@remix-run/react");
function useItemId() {
  let { itemId } = (0, import_react7.useParams)(), parsed = itemId ? parseInt(itemId) : null;
  return parsed && isNaN(parsed) ? null : parsed;
}

// app/hooks/mutation/useCreateCommentMutation.ts
var import_react_query2 = require("@tanstack/react-query");

// app/lib/api/items.ts
var import_qs2 = __toESM(require("qs"));
async function createItem(params) {
  return (await fetchClient.post("/api/items", params)).data;
}
async function getItems({
  mode,
  cursor,
  startDate,
  endDate
}) {
  return (await fetchClient.get("/api/items".concat(import_qs2.default.stringify({ mode, cursor, startDate, endDate }, {
    addQueryPrefix: !0
  })))).data;
}
async function getItem(itemId) {
  return (await fetchClient.get(`/api/items/${itemId}`)).data;
}
async function likeItem(itemId, controller) {
  return (await fetchClient.post(`/api/items/${itemId}/likes`, {}, {
    signal: controller == null ? void 0 : controller.signal
  })).data;
}
async function unlikeItem(itemId, controller) {
  return (await fetchClient.delete(`/api/items/${itemId}/likes`, {
    signal: controller == null ? void 0 : controller.signal
  })).data;
}
async function updateItem({
  itemId,
  title,
  body
}) {
  return (await fetchClient.patch(`/api/items/${itemId}`, {
    title,
    body,
    tags: []
  })).data;
}
async function deleteItem(itemId) {
  return fetchClient.delete(`/api/items/${itemId}`);
}
async function getComments(itemId) {
  return (await fetchClient.get(`/api/items/${itemId}/comments`)).data;
}
async function createComment({
  itemId,
  text,
  parentCommentId
}) {
  return (await fetchClient.post(`/api/items/${itemId}/comments`, {
    itemId,
    parentCommentId,
    text
  })).data;
}
async function likeComment({
  itemId,
  commentId,
  controller
}) {
  return (await fetchClient.post(`/api/items/${itemId}/comments/${commentId}/likes`, {}, {
    signal: controller == null ? void 0 : controller.signal
  })).data;
}
async function unlikeComment({
  itemId,
  commentId,
  controller
}) {
  return (await fetchClient.delete(`/api/items/${itemId}/comments/${commentId}/likes`, {
    signal: controller == null ? void 0 : controller.signal
  })).data;
}
async function deleteComment({ itemId, commentId }) {
  return (await fetchClient.delete(`/api/items/${itemId}/comments/${commentId}`)).data;
}
async function editComment({
  itemId,
  text,
  commentId
}) {
  return (await fetchClient.patch(`/api/items/${itemId}/comments/${commentId}`, {
    itemId,
    text
  })).data;
}

// app/hooks/mutation/useCreateCommentMutation.ts
function useCreateCommentMutation(options = {}) {
  return (0, import_react_query2.useMutation)(createComment, options);
}

// app/components/system/LoadingIndicator.tsx
var import_styled_components10 = __toESM(require("styled-components"));
function LoadingIndicator() {
  return /* @__PURE__ */ React.createElement(StyledSpinner, null);
}
var spin = import_styled_components10.keyframes`
 from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, StyledSpinner = (0, import_styled_components10.default)(Spinner_default)`
  width: 24px;
  height: 24px;
  display: block;
  animation: ${spin} 0.5s linear infinite;
  color: ${colors.gray3};
`, LoadingIndicator_default = LoadingIndicator;

// app/components/items/CommentInputOverlay.tsx
var import_react_query4 = require("@tanstack/react-query");

// app/hooks/query/useCommentsQuery.ts
var import_react_query3 = require("@tanstack/react-query");
function useCommentsQuery(itemId, options = {}) {
  return (0, import_react_query3.useQuery)(extractKey(itemId), () => getComments(itemId), options);
}
var extractKey = (itemId) => ["comments", itemId];
useCommentsQuery.extractKey = extractKey;

// app/components/items/CommentInputOverlay.tsx
var import_immer = __toESM(require("immer"));
function CommentInputOverlay() {
  let { visible, close, parentCommentId, commentId, defaultText } = useCommentInputStore(), [text, setText] = (0, import_react8.useState)(""), itemId = useItemId(), queryClient2 = (0, import_react_query4.useQueryClient)(), scrollToCommentId = (commentId2) => {
    let comment = document.body.querySelector(`[data-comment-id="${commentId2}"]`);
    !comment || comment.scrollIntoView();
  }, { mutate: write, isLoading: isLoadingWrite } = useCreateCommentMutation({
    onSuccess(data) {
      !itemId || (queryClient2.setQueryData(useCommentsQuery.extractKey(itemId), (prevComments) => {
        if (!!prevComments)
          return parentCommentId ? (0, import_immer.default)(prevComments, (draft) => {
            var _a;
            let rootComment = draft.find((c) => c.id === parentCommentId) ?? draft.find((c) => {
              var _a2;
              return (_a2 = c.subcomments) == null ? void 0 : _a2.find((sc) => sc.id === parentCommentId);
            });
            (_a = rootComment == null ? void 0 : rootComment.subcomments) == null || _a.push(data);
          }) : prevComments.concat(data);
      }), setTimeout(() => {
        scrollToCommentId(data.id);
      }, 0), close());
    },
    onError() {
      open({
        title: "\uC624\uB958",
        description: "\uB313\uAE00 \uC791\uC131 \uC2E4\uD328"
      });
    }
  }), { mutate: edit, isLoading: isLoadingEdit } = (0, import_react_query4.useMutation)(editComment, {
    onSuccess() {
      !itemId || (queryClient2.invalidateQueries(useCommentsQuery.extractKey(itemId)), close());
    },
    onError() {
      open({
        title: "\uC624\uB958",
        description: "\uB313\uAE00 \uC218\uC815 \uC2E4\uD328"
      });
    }
  }), isLoading = isLoadingWrite || isLoadingEdit;
  (0, import_react8.useEffect)(() => {
    visible && setText("");
  }, [visible]);
  let { open } = useDialog(), onClick = () => {
    if (!!itemId) {
      if (text.length === 0) {
        open({
          title: "\uC624\uB958",
          description: "\uB313\uAE00\uC744 \uC785\uB825\uD558\uC9C0 \uC54A\uC73C\uC168\uC2B5\uB2C8\uB2E4."
        });
        return;
      }
      if (commentId) {
        edit({
          itemId,
          commentId,
          text
        });
        return;
      }
      write({
        parentCommentId: parentCommentId ?? void 0,
        itemId,
        text
      });
    }
  }, buttonText = commentId ? "\uC218\uC815" : "\uB4F1\uB85D";
  return (0, import_react8.useEffect)(() => {
    defaultText !== "" && setText(defaultText);
  }, [defaultText]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Overlay_default, {
    visible,
    onClick: close
  }), /* @__PURE__ */ React.createElement(import_framer_motion4.AnimatePresence, {
    initial: !1
  }, visible && /* @__PURE__ */ React.createElement(Footer2, {
    initial: { y: 48 },
    animate: { y: 0 },
    exit: { y: 48 },
    transition: {
      damping: 0
    }
  }, /* @__PURE__ */ React.createElement(Input, {
    autoFocus: !0,
    placeholder: "\uB313\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694.",
    onChange: (e) => {
      setText(e.target.value);
    },
    value: text
  }), /* @__PURE__ */ React.createElement(TransparentButton, {
    onClick,
    disabled: isLoading
  }, isLoadingWrite ? /* @__PURE__ */ React.createElement(LoadingIndicator_default, null) : buttonText))));
}
var Footer2 = (0, import_styled_components11.default)(import_framer_motion4.motion.div)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 48px;
  background: white;
  display: flex;
  align-items: center;
`, Input = import_styled_components11.default.input`
  height: 100%;
  flex: 1;

  border: none;
  outline: none;
  padding: 0;
  padding-left: 16px;
  font-size: 16px;
  color: ${colors.gray5};
  &::placeholder {
    color: ${colors.gray1};
  }
`, TransparentButton = import_styled_components11.default.button`
  background: none;
  border: none;
  outline: none;
  font-size: 16px;
  padding-right: 16px;
  padding-left: 16px;
  height: 100%;
  color: ${colors.primary};
  width: 60px;
`, CommentInputOverlay_default = CommentInputOverlay;

// app/components/items/CommentList.tsx
var import_styled_components17 = __toESM(require("styled-components"));

// app/components/items/CommentInput.tsx
var import_styled_components12 = __toESM(require("styled-components"));

// app/hooks/useOpenLoginDialog.ts
var import_react9 = require("@remix-run/react"), import_react10 = require("react");
var descriptionMap = {
  like: "\uC774 \uAE00\uC774 \uB9C8\uC74C\uC5D0 \uB4DC\uC2DC\uB098\uC694? \uC774 \uAE00\uC744 \uB2E4\uB978 \uC0AC\uB78C\uB4E4\uC5D0\uAC8C\uB3C4 \uCD94\uCC9C\uD558\uAE30 \uC704\uD574\uC11C \uB85C\uADF8\uC778\uC744 \uD574\uC8FC\uC138\uC694.",
  comment: "\uB2F9\uC2E0\uC758 \uC758\uACAC\uC744 \uC801\uACE0 \uC2F6\uC73C\uC2E0\uAC00\uC694? \uB85C\uADF8\uC778\uC744 \uD558\uACE0 \uC758\uACAC\uC744 \uC801\uC5B4\uC8FC\uC138\uC694.",
  commentLike: "\uC774 \uB313\uAE00\uC774 \uB9C8\uC74C\uC5D0 \uB4DC\uC138\uC694? \uB85C\uADF8\uC778\uD558\uACE0 \uC88B\uC544\uC694\uB97C \uB20C\uB7EC\uC8FC\uC138\uC694.",
  bookmark: "\uB098\uC911\uC5D0 \uC774 \uAE00\uC744 \uB610 \uBCF4\uC2DC\uACE0 \uC2F6\uC73C\uC2E0\uAC00\uC694? \uB85C\uADF8\uC778\uD558\uACE0 \uBD81\uB9C8\uD06C\uB97C \uCD94\uAC00\uD574\uBCF4\uC138\uC694."
};
function useOpenLoginDialog() {
  let location = (0, import_react9.useLocation)(), navigate = (0, import_react9.useNavigate)(), { open } = useDialog();
  return (0, import_react10.useCallback)((type) => {
    let description = descriptionMap[type];
    open({
      description,
      title: "\uB85C\uADF8\uC778 \uD6C4 \uC774\uC6A9\uD574\uC8FC\uC138\uC694.",
      confirmText: "\uB85C\uADF8\uC778",
      onConfirm: () => navigate(`/auth/login?next=${location.pathname}`),
      mode: "YESNO"
    });
  }, [location, navigate, open]);
}

// app/components/items/CommentInput.tsx
function CommentInput() {
  let user = useUser(), openLoginDialog = useOpenLoginDialog(), write = useCommentInputStore((store) => store.write);
  return /* @__PURE__ */ React.createElement(DummyInput, {
    onClick: () => {
      if (!user) {
        openLoginDialog("comment");
        return;
      }
      write();
    }
  }, "\uB313\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694");
}
var DummyInput = import_styled_components12.default.div`
  height: 48px;
  width: 100%;
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  color: ${colors.gray1};
  font-size: 16px;
  border: 1px solid ${colors.gray2};
`, CommentInput_default = CommentInput;

// app/components/items/CommentItem.tsx
var import_styled_components16 = __toESM(require("styled-components"));

// app/hooks/useCommentLike.ts
var import_react11 = require("react");

// app/stores/useCommentLikesStore.ts
var import_immer2 = __toESM(require("immer")), import_zustand3 = __toESM(require("zustand")), useCommentLikesStore = (0, import_zustand3.default)((set) => ({
  commentLikesById: {},
  set(commentId, commentLike) {
    set((store) => (0, import_immer2.default)(store, (draft) => {
      draft.commentLikesById[commentId] = commentLike;
    }));
  }
}));
function useCommentLikeById(commentId) {
  return useCommentLikesStore((store) => store.commentLikesById)[commentId];
}
function useCommentLikeSetter() {
  return useCommentLikesStore((store) => store.set);
}

// app/hooks/useCommentLike.ts
function useCommentLike() {
  let set = useCommentLikeSetter(), like = (0, import_react11.useCallback)(({ commentId, prevLikes, itemId }) => {
    likeComment({
      itemId,
      commentId
    }), set(commentId, {
      isLiked: !0,
      likes: prevLikes + 1
    });
  }, [set]), unlike = (0, import_react11.useCallback)(({ commentId, prevLikes, itemId }) => {
    unlikeComment({
      itemId,
      commentId
    }), set(commentId, {
      isLiked: !1,
      likes: prevLikes - 1
    });
  }, [set]);
  return { like, unlike };
}

// app/hooks/useDateDistance.ts
var import_react12 = require("react"), import_date_fns = require("date-fns"), import_ko = __toESM(require("date-fns/locale/ko"));
function useDateDistance(date) {
  let [value, rerender] = (0, import_react12.useReducer)((state) => !state, !1);
  return (0, import_react12.useEffect)(() => {
    let interval = setInterval(() => {
      rerender();
    }, 6e4);
    return () => clearInterval(interval);
  }, []), (0, import_react12.useMemo)(() => {
    let d = date instanceof Date ? date : new Date(date);
    return Date.now() - d.getTime() < 60 * 1e3 ? "\uBC29\uAE08 \uC804" : (0, import_date_fns.formatDistanceToNow)(d, {
      locale: import_ko.default,
      addSuffix: !0
    });
  }, [date, value]);
}

// app/hooks/useDeleteComment.ts
var import_react_query5 = require("@tanstack/react-query"), import_react13 = require("react");
function useDeleteComment() {
  let itemId = useItemId(), queryClient2 = (0, import_react_query5.useQueryClient)();
  return (0, import_react13.useCallback)(async (commentId) => {
    !itemId || (await deleteComment({
      commentId,
      itemId
    }), queryClient2.invalidateQueries(useCommentsQuery.extractKey(itemId)));
  }, [itemId, queryClient2]);
}

// app/components/system/LikeButton.tsx
var import_styled_components14 = __toESM(require("styled-components"));

// app/components/system/IconToggleButton.tsx
var import_framer_motion5 = require("framer-motion"), import_styled_components13 = __toESM(require("styled-components"));
function IconToggleButton({ isActive, inactiveIcon, activeIcon, onClick, size = "medium" }) {
  return /* @__PURE__ */ React.createElement(StyledButton3, {
    onClick,
    size
  }, /* @__PURE__ */ React.createElement(import_framer_motion5.AnimatePresence, {
    initial: !1
  }, isActive ? /* @__PURE__ */ React.createElement(SvgWrapper, {
    key: "fill",
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 }
  }, activeIcon) : /* @__PURE__ */ React.createElement(SvgWrapper, {
    key: "outline",
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 }
  }, inactiveIcon)));
}
var StyledButton3 = import_styled_components13.default.button`
  padding: 0;
  border: none;
  outline: none;
  background: none;
  display: inline-flex;
  ${(props) => props.size === "medium" && import_styled_components13.css`
      width: 24px;
      height: 24px;
    `}

  ${(props) => props.size === "small" && import_styled_components13.css`
      width: 16px;
      height: 16px;
    `}

  svg {
    width: 100%;
    height: 100%;
  }
  position: relative;
`, SvgWrapper = (0, import_styled_components13.default)(import_framer_motion5.motion.span)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`, IconToggleButton_default = IconToggleButton;

// app/components/system/LikeButton.tsx
function LikeButton({ onClick, isLiked, size = "medium" }) {
  return /* @__PURE__ */ React.createElement(IconToggleButton_default, {
    size,
    onClick,
    isActive: isLiked,
    activeIcon: /* @__PURE__ */ React.createElement(StyledHeartFill, {
      key: "fill"
    }),
    inactiveIcon: /* @__PURE__ */ React.createElement(StyledHeartOutline, {
      key: "outline"
    })
  });
}
var StyledHeartOutline = (0, import_styled_components14.default)(HeartOutline_default)`
  color: ${colors.gray3};
`, StyledHeartFill = (0, import_styled_components14.default)(HeartFill_default)`
  color: ${colors.primary};
`, LikeButton_default = LikeButton;

// app/components/items/SubcommentList.tsx
var import_styled_components15 = __toESM(require("styled-components"));
function SubcommentList({ comments }) {
  return comments.length === 0 ? null : /* @__PURE__ */ React.createElement(List, null, comments.map((comment) => /* @__PURE__ */ React.createElement(CommentItem_default, {
    comment,
    isSubcomment: !0,
    key: comment.id
  })));
}
var List = import_styled_components15.default.div`
  padding-left: 24px;
  flex-direction: column;
  padding-top: 24px;
  gap: 24px;
  display: flex;
`, SubcommentList_default = SubcommentList;

// app/components/items/CommentItem.tsx
function CommentItem({ comment, isSubcomment }) {
  let { user, text, createdAt, subcomments, mentionUser, isDeleted } = comment, itemId = useItemId(), commentLike = useCommentLikeById(comment.id), { like, unlike } = useCommentLike(), { write, edit } = useCommentInputStore(), openLoginDialog = useOpenLoginDialog(), currentUser = useUser(), isMyComment = comment.user.id === (currentUser == null ? void 0 : currentUser.id), openBottomSheetModal = useBottomSheetModalStore((store) => store.open), deleteComment2 = useDeleteComment(), onClickMore = () => {
    openBottomSheetModal([
      {
        name: "\uC218\uC815",
        onClick: () => {
          edit(comment.id, text);
        }
      },
      {
        name: "\uC0AD\uC81C",
        onClick: () => {
          deleteComment2(comment.id);
        }
      }
    ]);
  }, likes = (commentLike == null ? void 0 : commentLike.likes) ?? comment.likes, isLiked = (commentLike == null ? void 0 : commentLike.isLiked) ?? comment.isLiked, toggleLike = () => {
    if (!!itemId) {
      if (!currentUser) {
        openLoginDialog("commentLike");
        return;
      }
      isLiked ? unlike({
        commentId: comment.id,
        itemId,
        prevLikes: likes
      }) : like({
        commentId: comment.id,
        itemId,
        prevLikes: likes
      });
    }
  }, onReply = () => {
    write(comment.id);
  }, dateDistance = useDateDistance(createdAt);
  return isDeleted ? /* @__PURE__ */ React.createElement(Block2, null, /* @__PURE__ */ React.createElement(DeletedText, null, "\uC0AD\uC81C\uB41C \uB313\uAE00\uC785\uB2C8\uB2E4."), !isSubcomment && subcomments && /* @__PURE__ */ React.createElement(SubcommentList_default, {
    comments: subcomments
  })) : /* @__PURE__ */ React.createElement(Block2, {
    "data-comment-id": comment.id
  }, /* @__PURE__ */ React.createElement(CommentHead, null, /* @__PURE__ */ React.createElement(LeftGroup, null, /* @__PURE__ */ React.createElement(Username, null, user.username), /* @__PURE__ */ React.createElement(Time, null, dateDistance)), isMyComment && /* @__PURE__ */ React.createElement(MoreButton, {
    onClick: onClickMore
  }, /* @__PURE__ */ React.createElement(MoreVert_default, null))), /* @__PURE__ */ React.createElement(Text, null, mentionUser ? /* @__PURE__ */ React.createElement(Mention, null, "@", mentionUser.username) : null, text), /* @__PURE__ */ React.createElement(CommentFooter, null, /* @__PURE__ */ React.createElement(LikeBlock, null, /* @__PURE__ */ React.createElement(LikeButton_default, {
    size: "small",
    isLiked,
    onClick: toggleLike
  }), /* @__PURE__ */ React.createElement(LikeCount, null, likes === 0 ? "" : likes.toLocaleString())), /* @__PURE__ */ React.createElement(ReplyButton, {
    onClick: onReply
  }, /* @__PURE__ */ React.createElement(SpeechBubble_default, null), "\uB2F5\uAE00 \uB2EC\uAE30")), !isSubcomment && subcomments && /* @__PURE__ */ React.createElement(SubcommentList_default, {
    comments: subcomments
  }));
}
var Block2 = import_styled_components16.default.div`
  display: flex;
  flex-direction: column;
`, CommentHead = import_styled_components16.default.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`, LeftGroup = import_styled_components16.default.div`
  display: flex;
  align-items: flex-end;
`, MoreButton = import_styled_components16.default.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${colors.gray5};
  svg {
    width: 20px;
    height: 20px;
  }
`, Username = import_styled_components16.default.div`
  color: ${colors.gray5};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
`, Time = import_styled_components16.default.div`
  color: ${colors.gray2};
  font-size: 12px;
  line-height: 1.5;
  margin-left: 8px;
`, Text = import_styled_components16.default.p`
  margin-top: 4px;
  margin-bottom: 12px;
  color: ${colors.gray5};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: keep-all;
  font-size: 14px;
`, CommentFooter = import_styled_components16.default.div`
  font-size: 12px;
  color: ${colors.gray3};
  line-height: 1.5;
  display: flex;
  gap: 8px;
`, LikeBlock = import_styled_components16.default.div`
  display: flex;
  align-items: center;
`, LikeCount = import_styled_components16.default.span`
  margin-left: 4px;
  min-width: 24px;
`, ReplyButton = import_styled_components16.default.button`
  background: none;
  outline: none;
  border: none;
  svg {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  display: flex;
  align-items: center;
`, Mention = import_styled_components16.default.span`
  color: ${colors.primary};
  margin-right: 4px;
`, DeletedText = (0, import_styled_components16.default)(Text)`
  color: ${colors.gray2};
  margin: 0;
`, CommentItem_default = CommentItem;

// app/components/items/CommentList.tsx
function CommentList({ comments }) {
  return /* @__PURE__ */ React.createElement(Block3, null, /* @__PURE__ */ React.createElement(CommentTitle, null, "\uB313\uAE00 0\uAC1C"), /* @__PURE__ */ React.createElement(CommentInput_default, null), /* @__PURE__ */ React.createElement(List2, null, comments.map((comment) => /* @__PURE__ */ React.createElement(CommentItem_default, {
    comment,
    key: comment.id
  }))));
}
var Block3 = import_styled_components17.default.div`
  padding: 16px;
`, CommentTitle = import_styled_components17.default.h3`
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
`, List2 = import_styled_components17.default.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`, CommentList_default = CommentList;

// app/components/items/ItemViewer.tsx
var import_framer_motion6 = require("framer-motion"), import_styled_components19 = __toESM(require("styled-components"));

// app/stores/useItemOverrideStore.ts
var import_immer3 = __toESM(require("immer")), import_zustand4 = __toESM(require("zustand")), useItemOverrideStore = (0, import_zustand4.default)((set) => ({
  overrides: {},
  set(itemId, overridableItem) {
    set((store) => (0, import_immer3.default)(store, (draft) => {
      draft.overrides[itemId] = overridableItem;
    }));
  }
}));
function useItemOverrideById(itemId) {
  let { overrides } = useItemOverrideStore();
  return overrides[itemId];
}
function useItemOverrideSetter() {
  return useItemOverrideStore((store) => store.set);
}

// app/hooks/useLikeManager.ts
var import_react14 = require("react");
function useLikeManager() {
  let set = useItemOverrideSetter(), abortControllers = (0, import_react14.useRef)(/* @__PURE__ */ new Map()).current, like = (0, import_react14.useCallback)(async (id, initialStats) => {
    let prevController = abortControllers.get(id);
    try {
      prevController == null || prevController.abort(), set(id, {
        itemStats: __spreadProps(__spreadValues({}, initialStats), { likes: initialStats.likes + 1 }),
        isLiked: !0
      });
      let controller = new AbortController();
      abortControllers.set(id, controller);
      let result = await likeItem(id, controller);
      abortControllers.delete(id), set(id, {
        itemStats: result.itemStats,
        isLiked: !0
      });
    } catch (e) {
      console.error(e);
    }
  }, [set, abortControllers]), unlike = (0, import_react14.useCallback)(async (id, initialStats) => {
    let prevController = abortControllers.get(id);
    try {
      prevController == null || prevController.abort(), set(id, {
        itemStats: __spreadProps(__spreadValues({}, initialStats), { likes: initialStats.likes - 1 }),
        isLiked: !1
      });
      let controller = new AbortController();
      abortControllers.set(id, controller);
      let result = await unlikeItem(id, controller);
      abortControllers.delete(id), set(id, {
        itemStats: result.itemStats,
        isLiked: !1
      });
    } catch (e) {
      console.error(e);
    }
  }, [set, abortControllers]);
  return { like, unlike };
}

// app/hooks/useBookmarkManager.ts
var import_react15 = require("react");

// app/lib/api/bookmark.ts
async function createBookmark(itemId, controller) {
  return (await fetchClient.post("/api/bookmarks", { itemId }, {
    signal: controller == null ? void 0 : controller.signal
  })).data;
}
async function deleteBookmark(itemId, controller) {
  return (await fetchClient.delete("/api/bookmarks", {
    signal: controller == null ? void 0 : controller.signal,
    params: { itemId }
  })).data;
}
async function getBookmarks(cursor) {
  return (await fetchClient.get("/api/bookmarks", {
    params: { cursor }
  })).data;
}

// app/hooks/useBookmarkManager.ts
function useBookmarkManager() {
  let set = useItemOverrideSetter(), abortControllers = (0, import_react15.useRef)(/* @__PURE__ */ new Map()).current, create5 = (0, import_react15.useCallback)(async (itemId) => {
    let prevController = abortControllers.get(itemId);
    try {
      prevController == null || prevController.abort(), set(itemId, {
        isBookmarked: !0
      });
      let controller = new AbortController();
      abortControllers.set(itemId, controller), await createBookmark(itemId, controller), abortControllers.delete(itemId);
    } catch {
    }
  }, [abortControllers, set]), remove = (0, import_react15.useCallback)(async (itemId) => {
    let prevController = abortControllers.get(itemId);
    try {
      prevController == null || prevController.abort(), set(itemId, {
        isBookmarked: !1
      });
      let controller = new AbortController();
      abortControllers.set(itemId, controller), await deleteBookmark(itemId, controller), abortControllers.delete(itemId);
    } catch {
    }
  }, [abortControllers, set]);
  return { create: create5, remove };
}

// app/components/system/BookmarkButton.tsx
var import_styled_components18 = __toESM(require("styled-components"));
function BookmarkButton({ onClick, isActive }) {
  return /* @__PURE__ */ React.createElement(IconToggleButton_default, {
    onClick,
    isActive,
    activeIcon: /* @__PURE__ */ React.createElement(StyledBookmarkFill, {
      key: "fill"
    }),
    inactiveIcon: /* @__PURE__ */ React.createElement(StyledBookmarkOutline, {
      key: "outline"
    })
  });
}
var StyledBookmarkOutline = (0, import_styled_components18.default)(BookmarkOutline_default)`
  color: ${colors.gray3};
`, StyledBookmarkFill = (0, import_styled_components18.default)(Bookmark_default)`
  color: ${colors.primary};
`, BookmarkButton_default = BookmarkButton;

// app/components/items/ItemViewer.tsx
function ItemViewer({ item }) {
  var _a;
  let { id, thumbnail, publisher, author, title, body, user, createdAt } = item, itemOverride = useItemOverrideById(id), dateDistance = useDateDistance(createdAt), itemStats = (itemOverride == null ? void 0 : itemOverride.itemStats) ?? item.itemStats, isLiked = (itemOverride == null ? void 0 : itemOverride.isLiked) ?? item.isLiked, likes = ((_a = itemOverride == null ? void 0 : itemOverride.itemStats) == null ? void 0 : _a.likes) ?? itemStats.likes, isBookmarked = (itemOverride == null ? void 0 : itemOverride.isBookmarked) ?? item.isBookmarked, { like, unlike } = useLikeManager(), { create: create5, remove } = useBookmarkManager(), openLoginDialog = useOpenLoginDialog(), currentUser = useUser(), toggleBookmark = () => {
    if (!currentUser) {
      openLoginDialog("bookmark");
      return;
    }
    isBookmarked ? remove(id) : create5(id);
  }, toggleLike = () => {
    if (!currentUser) {
      openLoginDialog("like");
      return;
    }
    isLiked ? unlike(id, itemStats) : like(id, itemStats);
  };
  return /* @__PURE__ */ React.createElement(Block4, null, thumbnail ? /* @__PURE__ */ React.createElement("a", {
    href: item.link
  }, /* @__PURE__ */ React.createElement(Thumbnail, {
    src: thumbnail
  })) : null, /* @__PURE__ */ React.createElement(Content, null, /* @__PURE__ */ React.createElement("a", {
    href: item.link
  }, /* @__PURE__ */ React.createElement(Publisher, null, publisher.favicon ? /* @__PURE__ */ React.createElement("img", {
    src: publisher.favicon,
    alt: "favicon"
  }) : /* @__PURE__ */ React.createElement(Globe_default, null), author ? `${author} \xB7 ` : "", publisher.name), /* @__PURE__ */ React.createElement(Title2, null, title), /* @__PURE__ */ React.createElement(Body, null, body)), /* @__PURE__ */ React.createElement(import_framer_motion6.AnimatePresence, {
    initial: !1
  }, likes === 0 ? null : /* @__PURE__ */ React.createElement(LikesCount, {
    key: "likes",
    initial: { height: 0, opacity: 0 },
    animate: { height: 26, opacity: 1 },
    exit: { height: 0, opacity: 0 }
  }, "\uC88B\uC544\uC694 ", likes.toLocaleString(), "\uAC1C")), /* @__PURE__ */ React.createElement(Footer3, null, /* @__PURE__ */ React.createElement(IconButtons, null, /* @__PURE__ */ React.createElement(LikeButton_default, {
    isLiked,
    onClick: toggleLike
  }), /* @__PURE__ */ React.createElement(BookmarkButton_default, {
    isActive: isBookmarked,
    onClick: toggleBookmark
  })), /* @__PURE__ */ React.createElement(UserInfo, null, "by ", /* @__PURE__ */ React.createElement("b", null, user.username), " \xB7 ", dateDistance))));
}
var Block4 = import_styled_components19.default.div`
  display: flex;
  flex-direction: column;
  & > a {
    display: block;
  }
`, Thumbnail = import_styled_components19.default.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
`, Content = import_styled_components19.default.div`
  padding: 16px;
  border-bottom: 1px solid ${colors.gray0};
  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
`, Publisher = import_styled_components19.default.div`
  display: flex;
  color: ${colors.gray3};
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.5;
  align-items: center;
  img,
  svg {
    display: block;
    margin-right: 8px;
    display: block;
    width: 16px;
    height: 16px;
  }
`, Title2 = import_styled_components19.default.h2`
  font-size: 18px;
  font-weight: 600;
  margin-top: 0;
  color: ${colors.gray5};
  line-height: 1.5;
  margin-bottom: 16px;
`, Body = import_styled_components19.default.p`
  margin-top: 0;
  margin-bottom: 32px;
  font-size: 14px;
  line-height: 1.5;
  color: ${colors.gray4};
  white-space: pre-wrap;
  word-break: keep-all;
`, LikesCount = (0, import_styled_components19.default)(import_framer_motion6.motion.div)`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.gray4};
  line-height: 1.5;
  height: 26px;
  display: flex;
`, Footer3 = import_styled_components19.default.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`, UserInfo = import_styled_components19.default.div`
  color: ${colors.gray2};
  font-size: 14px;
`, IconButtons = import_styled_components19.default.div`
  display: flex;
  align-items: center;
  gap: 8px;
`, ItemViewer_default = ItemViewer;

// app/components/layouts/BasicLayout.tsx
var import_styled_components27 = __toESM(require("styled-components"));

// app/hooks/useGoBack.ts
var import_react16 = require("@remix-run/react"), import_react17 = require("react");
function useGoBack() {
  let navigate = (0, import_react16.useNavigate)();
  return (0, import_react17.useCallback)(() => {
    navigate(-1);
  }, [navigate]);
}

// app/components/base/MobileHeader.tsx
var import_styled_components20 = __toESM(require("styled-components"));

// app/lib/media.ts
var breakpoints = {
  mobile: 500,
  tablet: 768,
  desktop: 1024,
  wide: 1200,
  xwide: 1440
}, mediaQuery = (width) => `@media (min-width: ${width}px)`, media = Object.entries(breakpoints).reduce((acc, [name, width]) => (acc[name] = mediaQuery(width), acc), {});

// app/components/base/MobileHeader.tsx
function MobileHeader({ title = /* @__PURE__ */ React.createElement(Logo_default, null), headerLeft, headerRight, className }) {
  return /* @__PURE__ */ React.createElement(Block5, {
    className
  }, headerLeft && /* @__PURE__ */ React.createElement(HeaderSide, {
    position: "left"
  }, headerLeft), /* @__PURE__ */ React.createElement(Title3, {
    className: "title"
  }, title), headerRight && /* @__PURE__ */ React.createElement(HeaderSide, {
    position: "right"
  }, headerRight));
}
var Block5 = import_styled_components20.default.header`
  position: relative;
  height: 56px;
  border-bottom: 1px solid ${colors.gray0};
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.mobile} {
    display: none;
  }
`, Title3 = import_styled_components20.default.div`
  color: ${colors.gray5};
  font-size: 18px;
  font-weight: 600;
  svg {
    display: block;
    width: 84px;
    height: 17px;
  }
`, HeaderSide = import_styled_components20.default.div`
  position: absolute;
  ${(props) => props.position}: 16px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
`, MobileHeader_default = MobileHeader;

// app/components/base/HeaderBackButton.tsx
var import_styled_components21 = __toESM(require("styled-components"));
function HeaderBackButton({ onClick }) {
  return /* @__PURE__ */ React.createElement(IconButton, {
    onClick
  }, /* @__PURE__ */ React.createElement(ArrowLeft_default, null));
}
var IconButton = import_styled_components21.default.button`
  padding: 0;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-left: -8px;
`, HeaderBackButton_default = HeaderBackButton;

// app/components/system/FullHeightPage.tsx
var import_styled_components22 = __toESM(require("styled-components")), GlobalFullHeight = import_styled_components22.createGlobalStyle`
  html, body {
    height: 100%;
  }
`;
function FullHeightPage({ children }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Page, null, children), /* @__PURE__ */ React.createElement(GlobalFullHeight, null));
}
var Page = import_styled_components22.default.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`, FullHeightPage_default = FullHeightPage;

// app/components/base/DesktopHeader.tsx
var import_react24 = require("@remix-run/react"), import_styled_components26 = __toESM(require("styled-components"));

// app/components/base/SearchArea.tsx
var import_react18 = require("@remix-run/react"), import_react19 = __toESM(require("react")), import_styled_components23 = __toESM(require("styled-components"));
function SearchArea() {
  let ref = (0, import_react19.useRef)(null), navigate = (0, import_react18.useNavigate)(), [searchParams] = (0, import_react18.useSearchParams)(), initialKeyword = searchParams.get("q") ?? "";
  return /* @__PURE__ */ import_react19.default.createElement(Block6, null, /* @__PURE__ */ import_react19.default.createElement(SearchInputWrapper, {
    onClick: () => {
      var _a;
      (_a = ref.current) == null || _a.focus();
    },
    onKeyUp: (e) => {
      var _a, _b;
      e.key === "Enter" && (console.log((_a = ref.current) == null ? void 0 : _a.value), navigate(`/search?q=${(_b = ref.current) == null ? void 0 : _b.value}`));
    }
  }, /* @__PURE__ */ import_react19.default.createElement(Search_default, null), /* @__PURE__ */ import_react19.default.createElement("input", {
    ref,
    defaultValue: initialKeyword
  })));
}
var Block6 = import_styled_components23.default.div``, SearchInputWrapper = import_styled_components23.default.div`
  height: 36px;
  padding-left: 12px;
  padding-right: 14px;
  border-radius: 4px;
  background: #f6f6f6;
  border: 1px solid ${colors.gray0};
  display: flex;
  align-items: center;
  width: 180px;
  margin-right: 8px;
  & > svg {
    width: 20px;
    height: 20px;
    color: ${colors.gray3};
    margin-right: 8px;
    flex-shrink: 0;
  }
  input {
    border: none;
    outline: none;
    flex: 1;
    min-width: 0;
    background: none;
  }
`, SearchArea_default = SearchArea;

// app/components/base/UserAddon.tsx
var import_react23 = require("react"), import_styled_components25 = __toESM(require("styled-components"));

// app/components/base/UserMenu.tsx
var import_react21 = require("@remix-run/react"), import_framer_motion7 = require("framer-motion"), import_react22 = require("react"), import_styled_components24 = __toESM(require("styled-components"));

// app/hooks/useClickOutside.ts
var import_react20 = require("react");
function useOnClickOutside(ref, handler) {
  (0, import_react20.useEffect)(() => {
    let listener = (event) => {
      let el = ref == null ? void 0 : ref.current;
      !el || el.contains((event == null ? void 0 : event.target) || null) || handler(event);
    };
    return document.addEventListener("mousedown", listener), document.addEventListener("touchstart", listener), () => {
      document.removeEventListener("mousedown", listener), document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// app/hooks/useLogout.ts
function useLogout() {
  return async () => {
    try {
      await logout();
    } catch {
    }
    window.location.href = "/";
  };
}

// app/components/base/UserMenu.tsx
function UserMenu({ visible, onClose }) {
  let ref = (0, import_react22.useRef)(null);
  useOnClickOutside(ref, (e) => {
    onClose(e);
  });
  let logout2 = useLogout(), navigate = (0, import_react21.useNavigate)();
  return /* @__PURE__ */ React.createElement(import_framer_motion7.AnimatePresence, {
    initial: !1
  }, visible ? /* @__PURE__ */ React.createElement(Block7, {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: {
      duration: 0.125
    },
    ref,
    onClick: () => onClose()
  }, /* @__PURE__ */ React.createElement(TriangleBorder, null), /* @__PURE__ */ React.createElement(Triangle, null), /* @__PURE__ */ React.createElement(MenuItem, {
    isDesktopHidden: !0,
    onClick: () => navigate("/write")
  }, "\uC0C8 \uAE00 \uB4F1\uB85D"), /* @__PURE__ */ React.createElement(MenuItem, {
    onClick: () => navigate("/setting/account")
  }, "\uB0B4 \uACC4\uC815"), /* @__PURE__ */ React.createElement(MenuItem, {
    onClick: () => navigate("/bookmarks")
  }, "\uBD81\uB9C8\uD06C"), /* @__PURE__ */ React.createElement(MenuItem, {
    onClick: logout2
  }, "\uB85C\uADF8\uC544\uC6C3")) : null);
}
var Block7 = (0, import_styled_components24.default)(import_framer_motion7.motion.div)`
  position: absolute;
  right: 0px;
  top: 48px;
  background: white;
  width: 200px;
  border: 1px solid ${colors.gray0};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
`, MenuItem = import_styled_components24.default.div`
  padding: 16px;
  cursor: pointer;
  &:hover {
    transition: all 0.125s ease-in;
    background: ${colors.gray0};
  }
  ${(props) => props.isDesktopHidden && import_styled_components24.css`
      display: block;
      ${mediaQuery(700)} {
        display: none;
      }
    `}
`, Triangle = import_styled_components24.default.div`
  position: absolute;
  right: 16px;
  top: -8px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
  z-index: 2;
`, TriangleBorder = import_styled_components24.default.div`
  position: absolute;
  right: 14px;
  top: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #e0e0e0;
  z-index: 1;
`, UserMenu_default = UserMenu;

// app/components/base/UserAddon.tsx
function UserAddon({ username }) {
  let [visible, setVisible] = (0, import_react23.useState)(!1), onOpen = () => setVisible(!0), onClose = (e) => {
    var _a;
    ((_a = buttonRef.current) == null ? void 0 : _a.contains(e == null ? void 0 : e.target)) || buttonRef.current === (e == null ? void 0 : e.target) || setVisible(!1);
  }, buttonRef = (0, import_react23.useRef)(null);
  return /* @__PURE__ */ React.createElement(Responsive, null, /* @__PURE__ */ React.createElement(WriteButton, {
    to: "/write",
    size: "small",
    variant: "secondary"
  }, "\uC0C8 \uAE00 \uC791\uC131"), /* @__PURE__ */ React.createElement(Button_default, {
    variant: "text",
    size: "small",
    onClick: onOpen,
    ref: buttonRef
  }, /* @__PURE__ */ React.createElement(Block8, null, /* @__PURE__ */ React.createElement(User_default, null), username)), /* @__PURE__ */ React.createElement(UserMenu_default, {
    visible,
    onClose
  }));
}
var Responsive = import_styled_components25.default.div`
  display: flex;
  position: relative;
`, Block8 = import_styled_components25.default.span`
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`, WriteButton = (0, import_styled_components25.default)(Button_default)`
  margin-right: 8px;
  display: none;
  ${mediaQuery(700)} {
    display: flex;
  }
`, UserAddon_default = UserAddon;

// app/components/base/DesktopHeader.tsx
function DesktopHeader() {
  let user = useUser();
  return /* @__PURE__ */ React.createElement(Block9, null, /* @__PURE__ */ React.createElement(HomeLink, {
    to: "/"
  }, /* @__PURE__ */ React.createElement(StyledLogo, null)), /* @__PURE__ */ React.createElement(Content2, null, /* @__PURE__ */ React.createElement(Addon, null), /* @__PURE__ */ React.createElement(Addon, null, /* @__PURE__ */ React.createElement(SearchArea_default, null), user ? /* @__PURE__ */ React.createElement(UserAddon_default, {
    username: user.username
  }) : /* @__PURE__ */ React.createElement(Buttons, null, /* @__PURE__ */ React.createElement(Button_default, {
    variant: "text",
    size: "small",
    to: "/auth/login"
  }, "\uB85C\uADF8\uC778"), /* @__PURE__ */ React.createElement(Button_default, {
    size: "small",
    to: "/auth/register"
  }, "\uD68C\uC6D0\uAC00\uC785")))));
}
var Block9 = import_styled_components26.default.div`
  height: 64px;
  border-bottom: 1px solid ${colors.gray0};
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  display: none;
  ${media.mobile} {
    display: flex;
  }
`, StyledLogo = (0, import_styled_components26.default)(Logo_default)`
  display: block;
  width: 84px;
  height: 17px;
  width: auto;
`, Content2 = import_styled_components26.default.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`, Addon = import_styled_components26.default.div`
  display: flex;
  align-items: center;
`, Buttons = import_styled_components26.default.div`
  display: flex;
  gap: 8px;
`, HomeLink = (0, import_styled_components26.default)(import_react24.Link)`
  display: block;
  color: inherit;
`, DesktopHeader_default = DesktopHeader;

// app/components/layouts/BasicLayout.tsx
function BasicLayout({
  hasBackButton,
  title,
  children,
  onGoBack,
  headerRight,
  desktopHeaderVisible = !0
}) {
  let goBack = useGoBack();
  return /* @__PURE__ */ React.createElement(FullHeightPage_default, null, /* @__PURE__ */ React.createElement(MobileHeader_default, {
    title,
    headerLeft: hasBackButton ? /* @__PURE__ */ React.createElement(HeaderBackButton_default, {
      onClick: onGoBack ?? goBack
    }) : void 0,
    headerRight
  }), desktopHeaderVisible ? /* @__PURE__ */ React.createElement(DesktopHeader_default, null) : null, /* @__PURE__ */ React.createElement(Content3, null, children));
}
var Content3 = import_styled_components27.default.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
`, BasicLayout_default = BasicLayout;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/items/$itemId.tsx
var loader2 = async ({ request, params }) => {
  let itemId = parseInt(params.itemId, 10), [item, comments] = await Promise.all([getItem(itemId), getComments(itemId)]);
  return (0, import_node2.json)({
    item,
    comments
  });
};
function Item2() {
  let loaderData = (0, import_react25.useLoaderData)(), navigate = (0, import_react25.useNavigate)(), { open: openBottomSheetModal } = useBottomSheetModalStore(), { open: openDialog } = useDialog(), user = useUser(), isMyItem = (user == null ? void 0 : user.id) === loaderData.item.user.id, { data: comments } = useCommentsQuery(loaderData.item.id, {
    initialData: loaderData.comments
  });
  return /* @__PURE__ */ React.createElement(BasicLayout_default, {
    hasBackButton: !0,
    title: null,
    headerRight: isMyItem && /* @__PURE__ */ React.createElement(MoreVertButton_default, {
      onClick: () => {
        openBottomSheetModal([
          {
            name: "\uC218\uC815",
            onClick() {
              navigate(`/write/edit?itemId=${loaderData.item.id}`);
            }
          },
          {
            name: "\uC0AD\uC81C",
            onClick() {
              openDialog({
                title: "\uC0AD\uC81C",
                description: "\uC815\uB9D0\uB85C \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
                mode: "YESNO",
                cancelText: "\uCDE8\uC18C",
                confirmText: "\uC0AD\uC81C",
                async onConfirm() {
                  await deleteItem(loaderData.item.id), navigate("/");
                }
              });
            }
          }
        ]);
      }
    })
  }, /* @__PURE__ */ React.createElement(Content4, null, /* @__PURE__ */ React.createElement(ItemViewer_default, {
    item: loaderData.item
  }), /* @__PURE__ */ React.createElement(CommentList_default, {
    comments
  }), /* @__PURE__ */ React.createElement(CommentInputOverlay_default, null)));
}
var Content4 = import_styled_components28.default.div`
  ${media.tablet} {
    padding-left: 1rem;
    padding-right: 1rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 64px;
  }
`, itemId_default = Item2;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/bookmarks.tsx
var bookmarks_exports = {};
__export(bookmarks_exports, {
  default: () => Bookmarks,
  loader: () => loader3
});
var import_node3 = require("@remix-run/node"), import_react30 = require("@remix-run/react"), import_react_query6 = require("@tanstack/react-query"), import_react31 = require("react"), import_styled_components34 = __toESM(require("styled-components"));

// app/components/home/LinkCardList.tsx
var import_styled_components30 = __toESM(require("styled-components"));

// app/components/home/LinkCard.tsx
var import_react26 = require("@remix-run/react"), import_framer_motion8 = require("framer-motion"), import_styled_components29 = __toESM(require("styled-components"));
function LinkCard({ item }) {
  var _a;
  let { thumbnail, title, publisher, body, author, user, createdAt, id } = item, itemOverride = useItemOverrideById(id), dateDistance = useDateDistance(createdAt), { like, unlike } = useLikeManager(), currentUser = useUser(), { create: create5, remove } = useBookmarkManager(), itemStats = (itemOverride == null ? void 0 : itemOverride.itemStats) ?? item.itemStats, isLiked = (itemOverride == null ? void 0 : itemOverride.isLiked) ?? item.isLiked, likes = ((_a = itemOverride == null ? void 0 : itemOverride.itemStats) == null ? void 0 : _a.likes) ?? itemStats.likes, isBookmarked = (itemOverride == null ? void 0 : itemOverride.isBookmarked) ?? item.isBookmarked, openLoginDialog = useOpenLoginDialog(), toggleLike = () => {
    if (!currentUser) {
      openLoginDialog("like");
      return;
    }
    isLiked ? unlike(id, itemStats) : like(id, itemStats);
  }, toggleBookmark = () => {
    if (!currentUser) {
      openLoginDialog("bookmark");
      return;
    }
    isBookmarked ? remove(id) : create5(id);
  }, link = `/items/${item.id}`;
  return /* @__PURE__ */ React.createElement(Block10, null, /* @__PURE__ */ React.createElement(StyledLink2, {
    to: link
  }, thumbnail ? /* @__PURE__ */ React.createElement(Thumbnail2, {
    src: thumbnail,
    alt: title
  }) : null, /* @__PURE__ */ React.createElement(Publisher2, null, publisher.favicon ? /* @__PURE__ */ React.createElement("img", {
    src: publisher.favicon,
    alt: "favicon"
  }) : /* @__PURE__ */ React.createElement(Globe_default, null), author ? `${author} \xB7 ` : "", publisher.name), /* @__PURE__ */ React.createElement("h3", null, title), /* @__PURE__ */ React.createElement("p", null, body)), /* @__PURE__ */ React.createElement(LikeCountWrapper, null, /* @__PURE__ */ React.createElement(import_framer_motion8.AnimatePresence, {
    initial: !1
  }, likes === 0 ? null : /* @__PURE__ */ React.createElement(LikesCount2, {
    key: "likes",
    initial: { height: 0, opacity: 0 },
    animate: { height: 26, opacity: 1 },
    exit: { height: 0, opacity: 0 }
  }, "\uC88B\uC544\uC694 ", likes.toLocaleString(), "\uAC1C"))), /* @__PURE__ */ React.createElement(Footer4, null, /* @__PURE__ */ React.createElement(IconButtons2, null, /* @__PURE__ */ React.createElement(LikeButton_default, {
    isLiked,
    onClick: toggleLike
  }), /* @__PURE__ */ React.createElement(BookmarkButton_default, {
    isActive: isBookmarked,
    onClick: toggleBookmark
  })), /* @__PURE__ */ React.createElement(UserInfo2, null, "by ", /* @__PURE__ */ React.createElement("b", null, user.username), " \xB7 ", dateDistance)));
}
var StyledLink2 = (0, import_styled_components29.default)(import_react26.Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
`, Block10 = import_styled_components29.default.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    color: ${colors.gray5};
  }
  p {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.5;
    color: ${colors.gray4};
    ${media.tablet} {
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 84px;
    }
  }
`, Thumbnail2 = import_styled_components29.default.img`
  width: 100%;
  max-height: 40vh;
  ${media.tablet} {
    aspect-ratio: 288/192;
  }
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 0 3px rgb(0 0 0 / 15%);
  display: block;
  margin-bottom: 16px;
`, Publisher2 = import_styled_components29.default.div`
  display: flex;
  color: ${colors.gray3};
  font-size: 14px;
  margin-bottom: 4px;
  line-height: 1.5;
  align-items: center;
  img,
  svg {
    display: block;
    margin-right: 8px;
    display: block;
    width: 16px;
    height: 16px;
  }
`, LikesCount2 = (0, import_styled_components29.default)(import_framer_motion8.motion.div)`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.gray4};
  line-height: 1.5;
  height: 26px;
  display: flex;
`, Footer4 = import_styled_components29.default.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`, LikeCountWrapper = import_styled_components29.default.div`
  ${media.tablet} {
    height: 26px;
  }
`, UserInfo2 = import_styled_components29.default.div`
  color: ${colors.gray2};
  font-size: 14px;
`, IconButtons2 = import_styled_components29.default.div`
  display: flex;
  align-items: center;
  gap: 8px;
`, EmptyLikeArea = import_styled_components29.default.div`
  height: 26px;
`, LinkCard_default = LinkCard;

// app/components/home/LinkCardList.tsx
function LinkCardList({ items }) {
  return /* @__PURE__ */ React.createElement(List3, null, items.map((item) => /* @__PURE__ */ React.createElement(LinkCard_default, {
    key: item.id,
    item
  })));
}
var List3 = import_styled_components30.default.div`
  /* display: flex;
  flex-direction: column; */
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.wide} {
    grid-template-columns: repeat(3, 1fr);
    margin-left: auto;
    margin-right: auto;
  }
  gap: 48px;
`, LinkCardList_default = LinkCardList;

// app/components/layouts/TabLayout.tsx
var import_styled_components33 = __toESM(require("styled-components"));

// app/components/base/Footer.tsx
var import_styled_components32 = __toESM(require("styled-components"));

// app/components/base/FooterTabItem.tsx
var import_react27 = require("@remix-run/react"), import_react28 = __toESM(require("react")), import_styled_components31 = __toESM(require("styled-components"));
var iconMap = {
  home: Home_default,
  search: Search_default,
  "plus-circle": PlusCircle_default,
  bookmark: Bookmark_default,
  setting: Setting_default
};
function FooterTabItem({ icon, to }) {
  let iconEl = import_react28.default.createElement(iconMap[icon]);
  return /* @__PURE__ */ import_react28.default.createElement(LinkItem, {
    to,
    className: ({ isActive }) => isActive ? "active" : ""
  }, iconEl);
}
var sharedStyle = import_styled_components31.css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: ${colors.gray2};
    width: 32px;
    height: 32px;
  }
  &:active {
    svg {
      color: ${colors.primary};
    }
  }
`, LinkItem = (0, import_styled_components31.default)(import_react27.NavLink)`
  ${sharedStyle}
  &.active {
    svg {
      color: ${colors.primary};
    }
  }
`, FooterTabItem_default = FooterTabItem;

// app/components/base/Footer.tsx
function Footer5() {
  return /* @__PURE__ */ React.createElement(StyledFooter, null, /* @__PURE__ */ React.createElement(FooterTabItem_default, {
    icon: "home",
    to: "/"
  }), /* @__PURE__ */ React.createElement(FooterTabItem_default, {
    icon: "search",
    to: "/search"
  }), /* @__PURE__ */ React.createElement(FooterTabItem_default, {
    icon: "plus-circle",
    to: "/write"
  }), /* @__PURE__ */ React.createElement(FooterTabItem_default, {
    icon: "bookmark",
    to: "/bookmarks"
  }), /* @__PURE__ */ React.createElement(FooterTabItem_default, {
    icon: "setting",
    to: "/setting"
  }));
}
var StyledFooter = import_styled_components32.default.footer`
  height: 56px;
  border-top: 1px solid ${colors.gray0};
  display: flex;
  ${media.mobile} {
    display: none;
  }
`, Footer_default = Footer5;

// app/components/layouts/TabLayout.tsx
function TabLayout({ header, children, className }) {
  return /* @__PURE__ */ React.createElement(FullHeightPage_default, null, header ?? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(MobileHeader_default, null), /* @__PURE__ */ React.createElement(DesktopHeader_default, null)), /* @__PURE__ */ React.createElement(Content5, {
    className
  }, children), /* @__PURE__ */ React.createElement(Footer_default, null));
}
var Content5 = import_styled_components33.default.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
`, TabLayout_default = TabLayout;

// app/hooks/useInfiniteScroll.ts
var import_react29 = require("react");
function useInfiniteScroll(ref, fetchNext) {
  (0, import_react29.useEffect)(() => {
    if (!ref.current)
      return;
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry2) => {
        entry2.isIntersecting && fetchNext();
      });
    }, {
      root: ref.current.parentElement,
      rootMargin: "300px",
      threshold: 1
    });
    return observer.observe(ref.current), () => {
      observer.disconnect();
    };
  }, [fetchNext, ref]);
}

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/bookmarks.tsx
var loader3 = async ({ request }) => {
  if (!await checkIsLoggedIn(request))
    return (0, import_node3.redirect)("/auth/login?next=/bookmarks");
  console.log("fetching bookmark!");
  let bookmarks = await getBookmarks();
  return (0, import_node3.json)(bookmarks);
};
function Bookmarks() {
  let initialData = (0, import_react30.useLoaderData)(), ref = (0, import_react31.useRef)(null), { data, hasNextPage, fetchNextPage } = (0, import_react_query6.useInfiniteQuery)(["bookmarks"], ({ pageParam }) => getBookmarks(pageParam), {
    initialData: {
      pageParams: [void 0],
      pages: [initialData]
    },
    getNextPageParam: (lastPage) => {
      if (!!lastPage.pageInfo.hasNextPage)
        return lastPage.pageInfo.nextOffset;
    }
  });
  useInfiniteScroll(ref, fetchNextPage);
  let items = data == null ? void 0 : data.pages.flatMap((page) => page.list.map((bookmark) => bookmark.item));
  return /* @__PURE__ */ React.createElement(StyledTabLayout, null, /* @__PURE__ */ React.createElement(Content6, null, items ? /* @__PURE__ */ React.createElement(LinkCardList_default, {
    items
  }) : null, /* @__PURE__ */ React.createElement("div", {
    ref
  })));
}
var StyledTabLayout = (0, import_styled_components34.default)(TabLayout_default)`
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
`, Content6 = import_styled_components34.default.div`
  ${media.wide} {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/setting.tsx
var setting_exports = {};
__export(setting_exports, {
  default: () => Setting,
  loader: () => loader4
});
var import_node4 = require("@remix-run/node"), import_react32 = require("@remix-run/react");
var loader4 = async ({ request }) => await checkIsLoggedIn(request) ? null : (0, import_node4.redirect)("/auth/login?next=/setting");
function Setting() {
  return /* @__PURE__ */ React.createElement(import_react32.Outlet, null);
}

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/setting/account.tsx
var account_exports = {};
__export(account_exports, {
  default: () => account_default
});

// app/components/setting/AccountSetting.tsx
var import_react_query7 = require("@tanstack/react-query"), import_react34 = require("react"), import_styled_components36 = __toESM(require("styled-components"));

// app/components/system/Input.tsx
var import_react33 = require("react"), import_styled_components35 = __toESM(require("styled-components"));
var Input2 = (0, import_react33.forwardRef)((_a, ref) => {
  var _b = _a, { errorMessage } = _b, rest = __objRest(_b, ["errorMessage"]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(StyledInput, __spreadValues({}, rest)), errorMessage ? /* @__PURE__ */ React.createElement(Message, null, errorMessage) : null);
});
Input2.displayName = "Input";
var StyledInput = import_styled_components35.default.input`
  height: 48px;
  border: 1px solid ${colors.gray2};
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  color: ${colors.gray5};
  transition: all 0.25s ease-in-out;
  &:focus {
    border: 1px solid ${colors.primary};
  }
  &::placeholder {
    color: ${colors.gray2};
  }
  &:disabled {
    background: ${colors.gray0};
    color: ${colors.gray3};
  }
`, Message = import_styled_components35.default.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
`, Input_default = Input2;

// app/lib/api/me.ts
async function changePassword({
  oldPassword,
  newPassword
}) {
  return (await fetchClient.post("/api/me/change-password", {
    oldPassword,
    newPassword
  })).data;
}
async function unregister() {
  return (await fetchClient.delete("/api/me")).data;
}

// app/components/setting/AccountSetting.tsx
function AccountSetting() {
  let user = useUser(), [form, setForm] = (0, import_react34.useState)({
    oldPassword: "",
    newPassword: ""
  }), { open } = useDialog(), reset = () => {
    setForm({
      oldPassword: "",
      newPassword: ""
    });
  }, { mutate: mutateChangePassword } = (0, import_react_query7.useMutation)(changePassword, {
    onSuccess: () => {
      open({
        title: "\uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD",
        description: "\uBE44\uBC00\uBC88\uD638\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4."
      }), reset();
    },
    onError: (e) => {
      let error = extractNextError(e);
      reset(), error.name === "BadRequest" ? open({
        title: "\uC2E4\uD328",
        description: "8\uC790 \uC774\uC0C1, \uC601\uBB38/\uC22B\uC790/\uD2B9\uC218\uBB38\uC790 \uC911 2\uAC00\uC9C0 \uC774\uC0C1 \uC785\uB825\uD574\uC8FC\uC138\uC694."
      }) : error.name === "Forbidden" && open({
        title: "\uC2E4\uD328",
        description: "\uC798\uBABB\uB41C \uBE44\uBC00\uBC88\uD638\uC785\uB2C8\uB2E4."
      });
    }
  }), onChange = (e) => {
    let key = e.target.name, { value } = e.target;
    setForm(__spreadProps(__spreadValues({}, form), { [key]: value }));
  }, onSubmit = async (e) => {
    e.preventDefault(), mutateChangePassword(form);
  }, askUnregister = () => {
    open({
      title: "\uD68C\uC6D0 \uD0C8\uD1F4",
      description: "\uC815\uB9D0\uB85C \uD0C8\uD1F4\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
      mode: "YESNO",
      cancelText: "\uCDE8\uC18C",
      confirmText: "\uD0C8\uD1F4",
      async onConfirm() {
        try {
          await unregister();
        } catch {
        }
        window.location.href = "/";
      }
    });
  };
  return user ? /* @__PURE__ */ React.createElement(Block11, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Title4, null, "\uB0B4 \uACC4\uC815"), /* @__PURE__ */ React.createElement(Section, null, /* @__PURE__ */ React.createElement("h4", null, "\uC544\uC774\uB514"), /* @__PURE__ */ React.createElement(Username2, null, user.username)), /* @__PURE__ */ React.createElement(Section, null, /* @__PURE__ */ React.createElement("h4", null, "\uBE44\uBC00\uBC88\uD638"), /* @__PURE__ */ React.createElement("form", {
    onSubmit
  }, /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(Input_default, {
    name: "oldPassword",
    placeholder: "\uD604\uC7AC \uBE44\uBC00\uBC88\uD638",
    type: "password",
    onChange,
    value: form.oldPassword
  }), /* @__PURE__ */ React.createElement(Input_default, {
    name: "newPassword",
    placeholder: "\uC0C8 \uBE44\uBC00\uBC88\uD638",
    type: "password",
    onChange,
    value: form.newPassword
  })), /* @__PURE__ */ React.createElement(Button_default, {
    variant: "secondary",
    type: "submit"
  }, "\uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD")))), /* @__PURE__ */ React.createElement(UnregisterWrapper, null, /* @__PURE__ */ React.createElement(UnregisterButton, {
    onClick: askUnregister
  }, "\uACC4\uC815 \uD0C8\uD1F4"))) : null;
}
var Title4 = import_styled_components36.default.h1`
  margin-top: 0;
  margin-bottom: 32px;
  font-weight: 800;
  color: ${colors.gray5};
  font-size: 48px;
  line-height: 1.5;
`, Block11 = import_styled_components36.default.div`
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  ${media.mobile} {
    width: 100%;
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    flex: initial;
    margin-top: 96px;
  }
`, Section = import_styled_components36.default.section`
  h4 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 16px;
    color: ${colors.gray3};
  }

  & + & {
    margin-top: 32px;
  }
`, Username2 = import_styled_components36.default.div`
  font-size: 16px;
  color: ${colors.gray5};
`, InputGroup = import_styled_components36.default.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  ${media.mobile} {
    width: 460px;
  }
`, UnregisterButton = import_styled_components36.default.button`
  font-size: 16px;
  color: #f53e3e;
  text-decoration: underline;
`, UnregisterWrapper = import_styled_components36.default.div`
  ${media.mobile} {
    margin-top: 96px;
  }
`, AccountSetting_default = AccountSetting;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/setting/account.tsx
function Account() {
  return /* @__PURE__ */ React.createElement(BasicLayout_default, {
    title: "\uB0B4 \uACC4\uC815",
    hasBackButton: !0
  }, /* @__PURE__ */ React.createElement(AccountSetting_default, null));
}
var account_default = Account;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/setting/index.tsx
var setting_exports2 = {};
__export(setting_exports2, {
  default: () => setting_default
});
var import_react_router_dom = require("react-router-dom"), import_styled_components37 = __toESM(require("styled-components"));
function SettingIndex() {
  let logout2 = useLogout();
  return /* @__PURE__ */ React.createElement(TabLayout_default, null, /* @__PURE__ */ React.createElement(Block12, null, /* @__PURE__ */ React.createElement(ListWrapper, null, /* @__PURE__ */ React.createElement(ListItemLink, {
    to: "/setting/account"
  }, "\uB0B4 \uACC4\uC815"), /* @__PURE__ */ React.createElement(ListItem, {
    onClick: logout2
  }, "\uB85C\uADF8\uC544\uC6C3"))));
}
var Block12 = import_styled_components37.default.div`
  background: ${colors.gray0};
  flex: 1;
`, ListWrapper = import_styled_components37.default.div`
  * + div {
    border-top: 1px solid ${colors.gray0};
  }
`, listItemStyle = import_styled_components37.css`
  padding: 16px;
  color: ${colors.gray5};
  background: white;
  &:active {
    opacity: 0.7;
  }
`, ListItem = import_styled_components37.default.div`
  ${listItemStyle}
`, ListItemLink = (0, import_styled_components37.default)(import_react_router_dom.Link)`
  ${listItemStyle}
  display: block;
  text-decoration: none;
`, setting_default = SettingIndex;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/search.tsx
var search_exports = {};
__export(search_exports, {
  default: () => Search,
  loader: () => loader5
});
var import_react35 = require("react"), import_styled_components41 = __toESM(require("styled-components"));

// app/components/search/SearchInput.tsx
var import_styled_components38 = __toESM(require("styled-components"));
function SearchInput({ value, onChangeText }) {
  return /* @__PURE__ */ React.createElement(Block13, null, /* @__PURE__ */ React.createElement(Search_default, null), /* @__PURE__ */ React.createElement("input", {
    value,
    onChange: (e) => {
      onChangeText(e.target.value);
    }
  }));
}
var Block13 = import_styled_components38.default.div`
  width: 100%;
  height: 32px;
  background: ${colors.gray0};
  border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  svg {
    width: 16px;
    height: 16px;
  }
  input {
    flex: 1;
    margin-left: 8px;
    background: none;
    border: none;
    outline: none;
  }
`, SearchInput_default = SearchInput;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/search.tsx
var import_use_debounce = require("use-debounce"), import_node5 = require("@remix-run/node");

// app/lib/parseUrlParams.ts
function parseUrlParams(url) {
  let params = new URLSearchParams(new URL(url).searchParams), result = {};
  for (let [key, value] of params)
    result[key] = value;
  return result;
}

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/search.tsx
var import_qs3 = require("qs"), import_react36 = require("@remix-run/react");

// app/lib/api/search.ts
async function searchItems({ q, offset }) {
  return (await fetchClient.get("/api/search", {
    params: {
      q,
      offset
    }
  })).data;
}

// app/components/search/SearchResultCardList.tsx
var import_styled_components40 = __toESM(require("styled-components"));

// app/components/search/SearchResultCard.tsx
var import_styled_components39 = __toESM(require("styled-components"));
function SearchResultCard({ item }) {
  let { publisher, author, highlight, likes } = item;
  return /* @__PURE__ */ React.createElement(Block14, null, " ", /* @__PURE__ */ React.createElement(Publisher3, null, publisher.favicon ? /* @__PURE__ */ React.createElement("img", {
    src: publisher.favicon,
    alt: "favicon"
  }) : /* @__PURE__ */ React.createElement(Globe_default, null), author ? `${author} \xB7 ` : "", publisher.name), /* @__PURE__ */ React.createElement("h3", {
    dangerouslySetInnerHTML: { __html: highlight.title }
  }), /* @__PURE__ */ React.createElement("p", {
    dangerouslySetInnerHTML: { __html: highlight.body }
  }), likes > 0 ? /* @__PURE__ */ React.createElement(LikesCount3, null, "\uC88B\uC544\uC694 ", likes.toLocaleString(), "\uAC1C") : null);
}
var Block14 = import_styled_components39.default.div`
  h3 {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 400;
    font-size: 16px;
    color: ${colors.gray4};
    line-height: 1.5;
    font-weight: 500;
  }
  em {
    color: ${colors.gray5};
    font-style: normal;
    font-weight: 800;
  }
  p {
    line-height: 1.5;
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 8px;
    color: ${colors.gray3};
  }
`, Publisher3 = import_styled_components39.default.div`
  display: flex;
  color: ${colors.gray3};
  font-size: 14px;
  margin-bottom: 4px;
  line-height: 1.5;
  align-items: center;
  img,
  svg {
    display: block;
    margin-right: 8px;
    display: block;
    width: 16px;
    height: 16px;
  }
`, LikesCount3 = import_styled_components39.default.div`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.gray4};
  line-height: 1.5;
  display: flex;
`, SearchResultCard_default = SearchResultCard;

// app/components/search/SearchResultCardList.tsx
function SearchResultCardList({ items }) {
  return /* @__PURE__ */ React.createElement(Block15, null, items.map((item) => /* @__PURE__ */ React.createElement(SearchResultCard_default, {
    item,
    key: item.id
  })));
}
var Block15 = import_styled_components40.default.div`
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  gap: 24px;
  flex-direction: column;
  ${media.desktop} {
    width: 768px;
    margin: 0 auto;
  }
`, SearchResultCardList_default = SearchResultCardList;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/search.tsx
var import_react_query8 = require("@tanstack/react-query");
var loader5 = async ({ request }) => {
  let { q } = parseUrlParams(request.url);
  if (!q)
    return (0, import_node5.json)({
      list: [],
      totalCount: 0,
      pageInfo: {
        nextOffset: null,
        hasNextPage: !1
      }
    });
  let searchResult = await searchItems({ q });
  return (0, import_node5.json)(searchResult);
};
function Search() {
  let data = (0, import_react36.useLoaderData)(), [searchParams] = (0, import_react36.useSearchParams)(), [searchText, setSearchText] = (0, import_react35.useState)(searchParams.get("q") ?? ""), [debouncedSearchText] = (0, import_use_debounce.useDebounce)(searchText, 300), {
    hasNextPage,
    data: infiniteData,
    isFetching,
    fetchNextPage
  } = (0, import_react_query8.useInfiniteQuery)(["searchResults", debouncedSearchText], ({ pageParam }) => searchItems({ q: debouncedSearchText, offset: pageParam }), {
    enabled: debouncedSearchText !== "",
    getNextPageParam: (lastPage, pages) => lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.nextOffset : null,
    initialData: {
      pageParams: [void 0],
      pages: [data]
    }
  }), queryClient2 = (0, import_react_query8.useQueryClient)();
  (0, import_react35.useEffect)(() => {
    queryClient2.setQueryData(["searchResults", debouncedSearchText], {
      pageParams: [void 0],
      pages: [data]
    });
  }, [data, debouncedSearchText, queryClient2]);
  let ref = (0, import_react35.useRef)(null), navigate = (0, import_react36.useNavigate)(), fetchNext = (0, import_react35.useCallback)(() => {
    !hasNextPage || fetchNextPage();
  }, [hasNextPage, fetchNextPage]);
  useInfiniteScroll(ref, fetchNext), (0, import_react35.useEffect)(() => {
    navigate("/search?" + (0, import_qs3.stringify)({ q: debouncedSearchText }));
  }, [debouncedSearchText, navigate]);
  let items = infiniteData == null ? void 0 : infiniteData.pages.flatMap((page) => page.list);
  return /* @__PURE__ */ React.createElement(TabLayout_default, {
    header: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(StyledHeader, {
      title: /* @__PURE__ */ React.createElement(SearchInput_default, {
        value: searchText,
        onChangeText: setSearchText
      })
    }), /* @__PURE__ */ React.createElement(DesktopHeader_default, null))
  }, /* @__PURE__ */ React.createElement(SearchResultCardList_default, {
    items: items ?? []
  }), /* @__PURE__ */ React.createElement("div", {
    ref
  }));
}
var StyledHeader = (0, import_styled_components41.default)(MobileHeader_default)`
  & > .title {
    width: 100%;
  }
`;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader6
});
var import_node6 = require("@remix-run/node"), import_react40 = require("@remix-run/react"), import_react_query9 = require("@tanstack/react-query"), import_react41 = require("react"), import_styled_components44 = __toESM(require("styled-components"));

// app/components/home/ListModeSelector.tsx
var import_framer_motion9 = require("framer-motion"), import_react37 = require("react"), import_styled_components42 = __toESM(require("styled-components"));
function ListModeSelector({ mode, onSelectMode }) {
  let [elementSizes, setElementSizes] = (0, import_react37.useState)([0, 0, 0]), setElementSizeOfIndex = (0, import_react37.useCallback)((index, size) => {
    setElementSizes((prev) => {
      let next = [...prev];
      return next[index] = size, next;
    });
  }, []), modeProps = (0, import_react37.useMemo)(() => [
    {
      mode: "trending",
      icon: /* @__PURE__ */ React.createElement(Trending_default, null),
      name: "\uD2B8\uB80C\uB529"
    },
    {
      mode: "recent",
      icon: /* @__PURE__ */ React.createElement(Time_default, null),
      name: "\uCD5C\uC2E0"
    },
    {
      mode: "past",
      icon: /* @__PURE__ */ React.createElement(Calendar_default, null),
      name: "\uACFC\uAC70"
    }
  ], []), currentIndex = (0, import_react37.useMemo)(() => modeProps.findIndex((p) => p.mode === mode), [modeProps, mode]), indicatorWidth = elementSizes[currentIndex], indicatorLeft = (0, import_react37.useMemo)(() => {
    let gaps = currentIndex * 16, sizes = elementSizes.slice(0, currentIndex).reduce((a, b) => a + b, 0);
    return gaps + sizes;
  }, [currentIndex, elementSizes]);
  return /* @__PURE__ */ React.createElement(Block16, null, modeProps.map((props, index) => /* @__PURE__ */ React.createElement(ListModeItem, __spreadProps(__spreadValues({}, props), {
    currentMode: mode,
    onSelectMode,
    key: props.name,
    index,
    onUpdateSize: setElementSizeOfIndex
  }))), indicatorWidth === 0 ? null : /* @__PURE__ */ React.createElement(Indicator, {
    layout: !0,
    style: {
      left: indicatorLeft,
      width: indicatorWidth
    }
  }));
}
function ListModeItem({
  currentMode,
  mode,
  onSelectMode,
  icon,
  name,
  onUpdateSize,
  index
}) {
  let ref = (0, import_react37.useRef)(null);
  return (0, import_react37.useEffect)(() => {
    !ref.current || onUpdateSize(index, ref.current.clientWidth);
  }, [onUpdateSize, index]), /* @__PURE__ */ React.createElement(Mode, {
    isActive: mode === currentMode,
    onClick: () => onSelectMode(mode),
    ref
  }, icon, name);
}
var Block16 = import_styled_components42.default.div`
  display: flex;
  margin-bottom: 24px;
  gap: 16px;
  position: relative;
`, Mode = import_styled_components42.default.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${colors.gray3};
  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  line-height: 1.5;
  font-size: 16px;

  ${(props) => props.isActive && import_styled_components42.css`
      color: ${colors.primary};
      font-weight: 600;
    `}
`, Indicator = (0, import_styled_components42.default)(import_framer_motion9.motion.div)`
  height: 2px;
  background: ${colors.primary};
  position: absolute;
  left: 0;
  bottom: -8px;
  border-radius: 1px;
`, ListModeSelector_default = ListModeSelector;

// app/components/home/WeekSelector.tsx
var import_react38 = require("@remix-run/react"), import_date_fns3 = require("date-fns"), import_react39 = require("react"), import_styled_components43 = __toESM(require("styled-components"));

// app/lib/week.ts
var import_date_fns2 = require("date-fns");
function getWeekRangeFromDate(d) {
  let day = d.getDay(), startDate = d.getDate() - day, start = (0, import_date_fns2.format)(new Date(d.setDate(startDate)), "yyyy-MM-dd"), end = (0, import_date_fns2.format)(new Date(new Date(start).setDate(startDate + 6)), "yyyy-MM-dd");
  return [start, end];
}
function addWeekToRange(range, weeks) {
  let [startDate] = range, d = new Date(startDate), nextStartDate = new Date(d.setDate(d.getDate() + weeks * 7)), nextEndDate = new Date(new Date(nextStartDate).setDate(nextStartDate.getDate() + 6)), start = (0, import_date_fns2.format)(nextStartDate, "yyyy-MM-dd"), end = (0, import_date_fns2.format)(nextEndDate, "yyyy-MM-dd");
  return [start, end];
}

// app/components/home/WeekSelector.tsx
var SERVICE_START_DATE = new Date("2022-09-01");
function WeekSelector({ dateRange }) {
  let [startDate, endDate] = (0, import_react39.useMemo)(() => {
    let [startDate2, endDate2] = dateRange, start = (0, import_date_fns3.format)(new Date(startDate2), "yyyy\uB144 MM\uC6D4 dd\uC77C"), end = (0, import_date_fns3.format)(new Date(endDate2), "yyyy\uB144 MM\uC6D4 dd\uC77C");
    return [start, end];
  }, [dateRange]), [, setSearchParams] = (0, import_react38.useSearchParams)(), onClickPrev = () => {
    let [start, end] = addWeekToRange(dateRange, -1);
    setSearchParams({ mode: "past", start, end });
  }, onClickNext = () => {
    let [start, end] = addWeekToRange(dateRange, 1);
    setSearchParams({ mode: "past", start, end });
  }, [prevDisabled, nextDisabled] = (0, import_react39.useMemo)(() => {
    let today = new Date((0, import_date_fns3.format)(new Date(), "yyyy-MM-dd")), [start, end] = dateRange.map((date) => new Date(date));
    return [start <= SERVICE_START_DATE, end >= today];
  }, [dateRange]);
  return /* @__PURE__ */ React.createElement(Block17, null, /* @__PURE__ */ React.createElement(DateInfo, null, startDate, " ~ ", endDate), /* @__PURE__ */ React.createElement(WeekNavigator, null, /* @__PURE__ */ React.createElement(TextButton, {
    onClick: onClickPrev,
    disabled: prevDisabled
  }, "\uC800\uBC88 \uC8FC"), /* @__PURE__ */ React.createElement(TextButton, {
    onClick: onClickNext,
    disabled: nextDisabled
  }, "\uB2E4\uC74C \uC8FC")));
}
var DateInfo = import_styled_components43.default.div``, WeekNavigator = import_styled_components43.default.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`, TextButton = import_styled_components43.default.button`
  display: inline-flex;
  background: none;
  outline: none;
  border: none;
  font-size: inherit;
  padding: 0;
  text-decoration: underline;
  &:disabled {
    color: ${colors.gray2};
    text-decoration: none;
  }
`, Block17 = import_styled_components43.default.div`
  font-size: 16px;
  margin-bottom: 16px;
  color: ${colors.gray5};
`, WeekSelector_default = WeekSelector;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/index.tsx
var loader6 = async ({ request }) => {
  let { mode, start, end } = parseUrlParams(request.url), fallbackedMode = mode ?? "trending", range = mode === "past" ? getWeekRangeFromDate(new Date()) : void 0, startDate = start ?? (range == null ? void 0 : range[0]), endDate = end ?? (range == null ? void 0 : range[1]), list = await getItems({ mode: fallbackedMode, startDate, endDate });
  return (0, import_node6.json)(list);
};
function Index() {
  let initialData = (0, import_react40.useLoaderData)(), [searchParams, setSearchParams] = (0, import_react40.useSearchParams)(), [mode, setMode] = (0, import_react41.useState)(searchParams.get("mode") ?? "trending"), defaultDateRange = (0, import_react41.useMemo)(() => getWeekRangeFromDate(new Date()), []), startDate = searchParams.get("start"), endDate = searchParams.get("end"), [dateRange, setDateRange] = (0, import_react41.useState)(startDate && endDate ? [startDate, endDate] : defaultDateRange);
  (0, import_react41.useEffect)(() => {
    mode === "past" && setDateRange(startDate && endDate ? [startDate, endDate] : defaultDateRange);
  }, [startDate, endDate, mode, defaultDateRange]), (0, import_react41.useEffect)(() => {
    let nextMode = searchParams.get("mode") ?? "trending";
    nextMode !== mode && setMode(nextMode);
  }, [mode, searchParams]);
  let { data, hasNextPage, fetchNextPage } = (0, import_react_query9.useInfiniteQuery)(["items", mode, mode === "past" ? { dateRange } : void 0].filter((item) => !!item), ({ pageParam }) => getItems(__spreadValues({
    mode,
    cursor: pageParam
  }, mode === "past" ? { startDate: dateRange[0], endDate: dateRange[1] } : {})), {
    initialData: {
      pageParams: [void 0],
      pages: [initialData]
    },
    getNextPageParam: (lastPage) => {
      if (!!lastPage.pageInfo.hasNextPage)
        return lastPage.pageInfo.endCursor;
    }
  }), ref = (0, import_react41.useRef)(null), fetchNext = (0, import_react41.useCallback)(() => {
    !hasNextPage || fetchNextPage();
  }, [fetchNextPage, hasNextPage]);
  useInfiniteScroll(ref, fetchNext);
  let items = data == null ? void 0 : data.pages.flatMap((page) => page.list);
  return /* @__PURE__ */ React.createElement(StyledTabLayout2, null, /* @__PURE__ */ React.createElement(Content7, null, /* @__PURE__ */ React.createElement(ListModeSelector_default, {
    mode,
    onSelectMode: (mode2) => {
      setSearchParams({ mode: mode2 });
    }
  }), mode === "past" && /* @__PURE__ */ React.createElement(WeekSelector_default, {
    dateRange
  }), items ? /* @__PURE__ */ React.createElement(LinkCardList_default, {
    items
  }) : null, /* @__PURE__ */ React.createElement("div", {
    ref
  })));
}
var StyledTabLayout2 = (0, import_styled_components44.default)(TabLayout_default)`
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
`, Content7 = import_styled_components44.default.div`
  ${media.wide} {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/write.tsx
var write_exports = {};
__export(write_exports, {
  default: () => write_default,
  loader: () => loader7
});
var import_node7 = require("@remix-run/node"), import_react43 = require("@remix-run/react");

// app/contexts/WriteContext.tsx
var import_react42 = require("react"), WriteContext = (0, import_react42.createContext)(null), initialState = {
  form: {
    link: "",
    title: "",
    body: ""
  },
  error: void 0
};
function WriteProvider({ children }) {
  let [state, setState] = (0, import_react42.useState)(initialState), actions = (0, import_react42.useMemo)(() => ({
    reset() {
      setState(initialState);
    },
    change(key, value2) {
      setState((prev) => __spreadProps(__spreadValues({}, prev), {
        form: __spreadProps(__spreadValues({}, prev.form), {
          [key]: value2
        })
      }));
    },
    setError(error) {
      setState((prev) => __spreadProps(__spreadValues({}, prev), {
        error
      }));
    }
  }), []), value = (0, import_react42.useMemo)(() => ({ state, actions }), [state, actions]);
  return /* @__PURE__ */ React.createElement(WriteContext.Provider, {
    value
  }, children);
}
function useWriteContext() {
  let context = (0, import_react42.useContext)(WriteContext);
  if (context === null)
    throw new Error("useWriteContext must be used within a WriteProvider");
  return context;
}

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/write.tsx
var loader7 = async ({ request }) => await checkIsLoggedIn(request) ? null : (0, import_node7.redirect)("/auth/login?next=/write");
function Write() {
  return /* @__PURE__ */ React.createElement(WriteProvider, null, /* @__PURE__ */ React.createElement(import_react43.Outlet, null));
}
var write_default = Write;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/write/index.tsx
var write_exports2 = {};
__export(write_exports2, {
  default: () => write_default2
});
var import_react45 = require("@remix-run/react");

// app/components/system/LabelInput.tsx
var import_react44 = __toESM(require("react")), import_styled_components45 = __toESM(require("styled-components"));
var LabelInput = (0, import_react44.forwardRef)((_a, ref) => {
  var _b = _a, { label, onBlur, onFocus } = _b, rest = __objRest(_b, ["label", "onBlur", "onFocus"]);
  let [focused, setFocused] = (0, import_react44.useState)(!1);
  return /* @__PURE__ */ import_react44.default.createElement(Block18, null, /* @__PURE__ */ import_react44.default.createElement(Label, {
    focused
  }, label), /* @__PURE__ */ import_react44.default.createElement(Input_default, __spreadProps(__spreadValues({
    onFocus: (e) => {
      onFocus == null || onFocus(e), setFocused(!0);
    },
    onBlur: (e) => {
      onBlur == null || onBlur(e), setFocused(!1);
    }
  }, rest), {
    ref
  })));
});
LabelInput.displayName = "LabelInput";
var Block18 = import_styled_components45.default.div`
  display: flex;
  flex-direction: column;
`, Label = import_styled_components45.default.label`
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.gray4};
  font-weight: 600;
  margin-bottom: 8px;
  transition: all 0.25s ease-in-out;
  ${(props) => props.focused && import_styled_components45.css`
      color: ${colors.primary};
    `}
`, LabelInput_default = LabelInput;

// app/components/write/WriteFormTemplate.tsx
var import_styled_components46 = __toESM(require("styled-components"));
function WriteFormTemplate({ description, children, buttonText, onSubmit }) {
  return /* @__PURE__ */ React.createElement(StyledForm, {
    onSubmit
  }, description && /* @__PURE__ */ React.createElement("h3", null, description), /* @__PURE__ */ React.createElement(Content8, null, children), /* @__PURE__ */ React.createElement(Button_default, null, buttonText));
}
var StyledForm = import_styled_components46.default.form`
  flex: 1;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;

  ${media.mobile} {
    flex: 1;
    justify-content: center;
    width: 460px;
    align-self: center;
  }

  h3 {
    color: ${colors.gray5};
    line-height: 1.5;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 16px;
  }
`, Content8 = import_styled_components46.default.section`
  flex: 1;
  display: flex;
  flex-direction: column;

  ${media.mobile} {
    flex: initial;
    padding-bottom: 24px;
  }
`, WriteFormTemplate_default = WriteFormTemplate;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/write/index.tsx
function WriteLink() {
  var _a;
  let navigate = (0, import_react45.useNavigate)(), { state, actions } = useWriteContext();
  return /* @__PURE__ */ React.createElement(BasicLayout_default, {
    title: "\uB9C1\uD06C \uC785\uB825",
    hasBackButton: !0
  }, /* @__PURE__ */ React.createElement(WriteFormTemplate_default, {
    description: "\uACF5\uC720\uD558\uACE0 \uC2F6\uC740 URL\uC744 \uC785\uB825\uD558\uC138\uC694.",
    buttonText: "\uB2E4\uC74C",
    onSubmit: (e) => {
      e.preventDefault(), navigate("/write/intro");
    }
  }, /* @__PURE__ */ React.createElement(LabelInput_default, {
    label: "URL",
    placeholder: "https://example.com",
    value: state.form.link,
    onChange: (e) => {
      actions.change("link", e.target.value);
    },
    errorMessage: ((_a = state.error) == null ? void 0 : _a.statusCode) === 422 ? "\uC720\uD6A8\uD558\uC9C0 \uC54A\uC740 URL\uC785\uB2C8\uB2E4." : void 0
  })));
}
var write_default2 = WriteLink;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/write/intro.tsx
var intro_exports = {};
__export(intro_exports, {
  CatchBoundary: () => CatchBoundary2,
  action: () => action,
  default: () => intro_default
});
var import_node8 = require("@remix-run/node"), import_react47 = require("@remix-run/react"), import_react48 = __toESM(require("react")), import_styled_components48 = __toESM(require("styled-components"));

// app/components/system/LabelTextArea.tsx
var import_react46 = require("react"), import_styled_components47 = __toESM(require("styled-components"));
var LabelTextArea = (0, import_react46.forwardRef)((_a, ref) => {
  var _b = _a, { label, onBlur, onFocus, className } = _b, rest = __objRest(_b, ["label", "onBlur", "onFocus", "className"]);
  let [focused, setFocused] = (0, import_react46.useState)(!1);
  return /* @__PURE__ */ React.createElement(Block19, {
    className
  }, /* @__PURE__ */ React.createElement(Label2, {
    focused
  }, label), /* @__PURE__ */ React.createElement(StyledTextArea, __spreadProps(__spreadValues({
    onFocus: (e) => {
      onFocus == null || onFocus(e), setFocused(!0);
    },
    onBlur: (e) => {
      onBlur == null || onBlur(e), setFocused(!1);
    }
  }, rest), {
    ref
  })));
});
LabelTextArea.displayName = "LabelTextArea";
var Label2 = import_styled_components47.default.label`
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.gray4};
  font-weight: 600;
  margin-bottom: 8px;
  transition: all 0.25s ease-in-out;
  ${(props) => props.focused && import_styled_components47.css`
      color: ${colors.primary};
    `}
`, StyledTextArea = import_styled_components47.default.textarea`
  border: 1px solid ${colors.gray2};
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  line-height: 1.5;
  padding-left: 16px;
  padding-right: 16px;
  color: ${colors.gray5};
  transition: all 0.25s ease-in-out;
  &:focus {
    border: 1px solid ${colors.primary};
  }
  &::placeholder {
    color: ${colors.gray2};
  }
  &:disabled {
    background: ${colors.gray0};
    color: ${colors.gray3};
  }
`, Block19 = import_styled_components47.default.div`
  display: flex;
  flex-direction: column;
`, LabelTextArea_default = LabelTextArea;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/write/intro.tsx
var action = async ({ request }) => {
  if (!await applyAuth(request))
    throw new Error("Not logged in");
  let form = await request.formData(), link = form.get("link"), title = form.get("title"), body = form.get("body");
  try {
    let item = await createItem({ link, title, body });
    return (0, import_node8.redirect)(`/items/${item.id}`);
  } catch (e) {
    let error = extractNextError(e);
    throw (0, import_node8.json)(error, {
      status: error.statusCode
    });
  }
};
function Intro() {
  let {
    state: { form },
    actions
  } = useWriteContext(), [errorMessage, setErrorMessage] = (0, import_react48.useState)(null), fetcher = (0, import_react47.useFetcher)(), onChange = (e) => {
    let key = e.target.name, { value } = e.target;
    actions.change(key, value);
  };
  return /* @__PURE__ */ import_react48.default.createElement(BasicLayout_default, {
    title: "\uB274\uC2A4 \uC18C\uAC1C",
    hasBackButton: !0
  }, /* @__PURE__ */ import_react48.default.createElement(WriteFormTemplate_default, {
    description: "\uACF5\uC720\uD560 \uB274\uC2A4\uB97C \uC18C\uAC1C\uD558\uC138\uC694.",
    buttonText: "\uB4F1\uB85D\uD558\uAE30",
    onSubmit: async (e) => {
      if (e.preventDefault(), form.title === "" || form.body === "") {
        setErrorMessage("\uC81C\uBAA9\uACFC \uB0B4\uC6A9\uC744 \uBAA8\uB450 \uC785\uB825\uD574\uC8FC\uC138\uC694.");
        return;
      }
      fetcher.submit(form, {
        method: "post"
      });
    }
  }, /* @__PURE__ */ import_react48.default.createElement(Group, null, /* @__PURE__ */ import_react48.default.createElement(LabelInput_default, {
    label: "\uC81C\uBAA9",
    name: "title",
    onChange,
    value: form.title
  }), /* @__PURE__ */ import_react48.default.createElement(StyledLabelTextArea, {
    label: "\uB0B4\uC6A9",
    name: "body",
    onChange,
    value: form.body
  }), errorMessage ? /* @__PURE__ */ import_react48.default.createElement(Message2, null, errorMessage) : null)));
}
function CatchBoundary2() {
  let caught = useNextAppErrorCatch(), { actions } = useWriteContext(), navigate = (0, import_react47.useNavigate)();
  return (0, import_react48.useEffect)(() => {
    caught.status === 422 && (navigate(-1), actions.setError(caught.data));
  }, [caught, navigate, actions]), /* @__PURE__ */ import_react48.default.createElement(Intro, null);
}
var Group = import_styled_components48.default.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  padding-bottom: 16px;
`, StyledLabelTextArea = (0, import_styled_components48.default)(LabelTextArea_default)`
  flex: 1;
  textarea {
    flex: 1;
    resize: none;
    font-family: inherit;
  }
`, Message2 = import_styled_components48.default.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
  text-align: center;
`, intro_default = Intro;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/write/edit.tsx
var edit_exports = {};
__export(edit_exports, {
  default: () => edit_default,
  loader: () => loader8
});
var import_node9 = require("@remix-run/node"), import_react49 = require("@remix-run/react"), import_react50 = require("react"), import_styled_components49 = __toESM(require("styled-components"));
var loader8 = async ({ request }) => {
  let query = parseUrlParams(request.url), itemId = parseInt(query.itemId, 10), item = await getItem(itemId);
  return (0, import_node9.json)(item);
};
function Edit() {
  let item = (0, import_react49.useLoaderData)(), navigate = (0, import_react49.useNavigate)(), [form, setForm] = (0, import_react50.useState)({
    title: item.title,
    body: item.body
  }), onChange = (e) => {
    let key = e.target.name, { value } = e.target;
    setForm(__spreadProps(__spreadValues({}, form), { [key]: value }));
  }, onSubmit = async (e) => {
    e.preventDefault(), await updateItem(__spreadValues({
      itemId: item.id
    }, form)), navigate(`/items/${item.id}`);
  }, errorMessage = null;
  return /* @__PURE__ */ React.createElement(BasicLayout_default, {
    title: "\uC218\uC815",
    hasBackButton: !0
  }, /* @__PURE__ */ React.createElement(WriteFormTemplate_default, {
    buttonText: "\uC218\uC815\uD558\uAE30",
    onSubmit
  }, /* @__PURE__ */ React.createElement(Group2, null, /* @__PURE__ */ React.createElement(LabelInput_default, {
    label: "\uC81C\uBAA9",
    name: "title",
    onChange,
    value: form.title
  }), /* @__PURE__ */ React.createElement(StyledLabelTextArea2, {
    label: "\uB0B4\uC6A9",
    name: "body",
    onChange,
    value: form.body
  }), errorMessage ? /* @__PURE__ */ React.createElement(Message3, null, errorMessage) : null)));
}
var Group2 = import_styled_components49.default.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  padding-bottom: 16px;
`, StyledLabelTextArea2 = (0, import_styled_components49.default)(LabelTextArea_default)`
  flex: 1;
  textarea {
    flex: 1;
    resize: none;
    font-family: inherit;
  }
`, Message3 = import_styled_components49.default.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
  text-align: center;
`, edit_default = Edit;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/auth.tsx
var auth_exports = {};
__export(auth_exports, {
  default: () => auth_default,
  loader: () => loader9
});
var import_node10 = require("@remix-run/node"), import_react51 = require("@remix-run/react");
var loader9 = async ({ request }) => await checkIsLoggedIn(request) ? (0, import_node10.redirect)("/") : null;
function Auth() {
  return /* @__PURE__ */ React.createElement(import_react51.Outlet, null);
}
var auth_default = Auth;

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/auth/register.tsx
var register_exports = {};
__export(register_exports, {
  CatchBoundary: () => CatchBoundary3,
  action: () => action2,
  default: () => Register
});
var import_node11 = require("@remix-run/node"), import_react59 = require("@remix-run/react");

// app/components/auth/AuthForm.tsx
var import_react55 = require("@remix-run/react"), import_react56 = require("react"), import_styled_components51 = __toESM(require("styled-components"));

// app/hooks/useForm.ts
var import_react52 = require("react"), DEFAULT_VALIDATE_MESSAGE = "Validation Error";
function useForm({
  form,
  initialValues,
  mode = "submit",
  shouldPreventDefault
}) {
  let [errors, setErrors] = (0, import_react52.useState)({}), errorsRef = (0, import_react52.useRef)(errors), setError = (0, import_react52.useCallback)((key, error) => {
    errorsRef.current[key] !== error && (errorsRef.current[key] = error, setErrors((prevErrors) => __spreadProps(__spreadValues({}, prevErrors), {
      [key]: error
    })));
  }, []), inputRefs = (0, import_react52.useRef)({}), inputProps = (0, import_react52.useMemo)(() => {
    let partialInputProps = {};
    return Object.keys(form).forEach((key) => {
      let inputConfig = form[key], validate2 = inputConfig.validate, handleValidation = (text) => {
        if (!validate2)
          return;
        if (validate2(text))
          setError(key, null);
        else {
          let errorMessage = inputConfig.errorMessage ?? DEFAULT_VALIDATE_MESSAGE;
          setError(key, errorMessage);
        }
      };
      partialInputProps[key] = {
        onChange: (e) => {
          var _a;
          (_a = inputConfig.onChange) == null || _a.call(inputConfig, e), !!["change", "all"].includes(mode) && handleValidation(e.target.value);
        },
        onBlur: (e) => {
          var _a;
          (_a = inputConfig.onBlur) == null || _a.call(inputConfig, e), !!["blur", "all"].includes(mode) && handleValidation(e.target.value);
        },
        name: key,
        ref: (ref) => {
          inputRefs.current[key] = ref;
        }
      };
    }), partialInputProps;
  }, [mode, setError, form]), handleSubmit = (0, import_react52.useCallback)((onSubmit) => (e) => {
    let formData = new FormData(e.currentTarget), formDataJSON = Object.fromEntries(formData);
    if (!Object.entries(formDataJSON).reduce((acc, [key, value]) => {
      let { validate: validate2, errorMessage } = form[key];
      return (validate2 == null ? void 0 : validate2(value)) === !1 ? (setError(key, errorMessage ?? DEFAULT_VALIDATE_MESSAGE), !1) : acc;
    }, !0)) {
      e.preventDefault();
      return;
    }
    (shouldPreventDefault ?? !0) && e.preventDefault(), onSubmit(formDataJSON, e);
  }, [shouldPreventDefault, setError, form]);
  return (0, import_react52.useEffect)(() => {
    Object.keys(form).forEach((key) => {
      let initialValue = (initialValues == null ? void 0 : initialValues[key]) ?? form[key].initialValue, el = inputRefs.current[key];
      initialValue !== void 0 && el && (el.value = initialValue);
    });
  }, [form, initialValues]), {
    inputProps,
    errors,
    handleSubmit,
    setError
  };
}

// app/hooks/useSubmitLoading.ts
var import_react53 = require("@remix-run/react");
function useSubmitLoading() {
  let transition = (0, import_react53.useTransition)();
  return ["submitting", "loading"].includes(transition.state);
}

// app/lib/validate.ts
var validate = {
  username: (text) => /^[a-z0-9]{5,20}$/.test(text),
  password: (text) => {
    let passwordRules = [/[a-zA-Z]/, /[0-9]/, /[^A-Za-z0-9]/];
    return text.length < 8 ? !1 : passwordRules.reduce((acc, current) => (current.test(text) && (acc += 1), acc), 0) > 1;
  },
  link: (text) => /^(http|https):\/\/[^ "]+$/.test(text)
};

// app/components/auth/QuestionLink.tsx
var import_react54 = require("@remix-run/react"), import_styled_components50 = __toESM(require("styled-components"));
function QuestionLink({ question, name, to, className }) {
  return /* @__PURE__ */ React.createElement(Block20, {
    className
  }, question, " ", /* @__PURE__ */ React.createElement(import_react54.Link, {
    to
  }, name));
}
var Block20 = import_styled_components50.default.div`
  color: ${colors.gray3};
  a {
    font-weight: 600;
    color: ${colors.gray5};
  }
`, QuestionLink_default = QuestionLink;

// app/components/auth/AuthForm.tsx
var authDescriptions = {
  login: {
    usernamePlaceholder: "\uC544\uC774\uB514\uB97C \uC785\uB825\uD558\uC138\uC694.",
    passwordPlaceholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694.",
    buttonText: "\uB85C\uADF8\uC778",
    actionText: "\uD68C\uC6D0\uAC00\uC785",
    question: "\uACC4\uC815\uC774 \uC5C6\uC73C\uC2E0\uAC00\uC694?",
    actionLink: "/auth/register"
  },
  register: {
    usernamePlaceholder: "5~20\uC790 \uC0AC\uC774\uC758 \uC601\uBB38 \uC18C\uBB38\uC790 \uC22B\uC790 \uC785\uB825",
    passwordPlaceholder: "8\uC790 \uC774\uC0C1, \uC601\uBB38/\uC22B\uC790/\uD2B9\uC218\uBB38\uC790 \uC911 2\uAC00\uC9C0 \uC774\uC0C1 \uC785\uB825",
    buttonText: "\uD68C\uC6D0\uAC00\uC785",
    actionText: "\uB85C\uADF8\uC778",
    question: "\uACC4\uC815\uC774 \uC774\uBBF8 \uC788\uC73C\uC2E0\uAC00\uC694?",
    actionLink: "/auth/login"
  }
};
function AuthForm({ mode, error }) {
  let action4 = (0, import_react55.useActionData)(), [searchParams] = (0, import_react55.useSearchParams)(), next = searchParams.get("next"), isLoading = useSubmitLoading(), { inputProps, handleSubmit, errors, setError } = useForm({
    form: {
      username: {
        validate: mode === "register" ? validate.username : void 0,
        errorMessage: "5~20\uC790 \uC0AC\uC774\uC758 \uC601\uBB38 \uC18C\uBB38\uC790 \uB610\uB294 \uC22B\uC790\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694."
      },
      password: {
        validate: mode === "register" ? validate.password : void 0,
        errorMessage: "8\uC790 \uC774\uC0C1, \uC601\uBB38/\uC22B\uC790/\uD2B9\uC218\uBB38\uC790 \uC911 2\uAC00\uC9C0 \uC774\uC0C1 \uC785\uB825\uD574\uC8FC\uC138\uC694."
      }
    },
    mode: "all",
    shouldPreventDefault: !1
  }), { usernamePlaceholder, passwordPlaceholder, buttonText, actionText, question, actionLink } = authDescriptions[mode], onSubmit = handleSubmit(() => {
  });
  return (0, import_react56.useEffect)(() => {
    (error == null ? void 0 : error.name) === "AlreadyExists" && setError("username", "\uC774\uBBF8 \uC874\uC7AC\uD558\uB294 \uACC4\uC815\uC785\uB2C8\uB2E4.");
  }, [error, setError]), /* @__PURE__ */ React.createElement(StyledForm2, {
    method: "post",
    onSubmit
  }, /* @__PURE__ */ React.createElement(DesktopLogoLink, {
    to: "/"
  }, /* @__PURE__ */ React.createElement(Logo_default, null)), /* @__PURE__ */ React.createElement(InputGroup2, null, /* @__PURE__ */ React.createElement(LabelInput_default, __spreadValues({
    label: "\uC544\uC774\uB514",
    placeholder: usernamePlaceholder,
    disabled: isLoading,
    errorMessage: errors.username
  }, inputProps.username)), /* @__PURE__ */ React.createElement(LabelInput_default, __spreadValues({
    label: "\uBE44\uBC00\uBC88\uD638",
    name: "password",
    placeholder: passwordPlaceholder,
    disabled: isLoading,
    errorMessage: errors.password,
    type: "password"
  }, inputProps.password))), /* @__PURE__ */ React.createElement(ActionsBox, null, (error == null ? void 0 : error.name) === "WrongCredentials" ? /* @__PURE__ */ React.createElement(ActionErrorMessage, null, "\uC798\uBABB\uB41C \uACC4\uC815 \uC815\uBCF4\uC785\uB2C8\uB2E4.") : null, /* @__PURE__ */ React.createElement(Button_default, {
    type: "submit",
    layoutMode: "fullWidth",
    disabled: isLoading
  }, buttonText), /* @__PURE__ */ React.createElement(QuestionLink_default, {
    question,
    name: actionText,
    to: next ? `${actionLink}?next=${next}` : actionLink
  })));
}
var StyledForm2 = (0, import_styled_components51.default)(import_react55.Form)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;

  justify-content: space-between;

  ${media.mobile} {
    justify-content: center;
    width: 460px;
    align-self: center;
  }
`, InputGroup2 = import_styled_components51.default.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`, ActionsBox = import_styled_components51.default.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  ${media.mobile} {
    margin-top: 24px;
  }
`, ActionErrorMessage = import_styled_components51.default.div`
  text-align: center;
  color: red;
  font-size: 14px;
`, DesktopLogoLink = (0, import_styled_components51.default)(import_react55.Link)`
  display: none;
  ${media.mobile} {
    display: flex;
  }
  justify-content: center;
  margin-bottom: 48px;
  svg {
    color: ${colors.gray5};
    height: 32px;
    width: auto;
  }
`, AuthForm_default = AuthForm;

// app/hooks/useAuthRedirect.ts
var import_react57 = require("@remix-run/react"), import_react58 = require("react");
function useAuthRedirect() {
  let authResult = (0, import_react57.useActionData)(), [searchParams] = (0, import_react57.useSearchParams)(), next = searchParams.get("next") ?? "/", navigate = (0, import_react57.useNavigate)();
  (0, import_react58.useEffect)(() => {
    !authResult || "status" in authResult || navigate(next);
  }, [authResult, navigate, next]);
}

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/auth/register.tsx
var import_react60 = require("react");
var action2 = async ({ request }) => {
  let form = await request.formData(), username = form.get("username"), password = form.get("password");
  if (!(typeof username != "string" || typeof password != "string"))
    try {
      let { headers, result } = await register({ username, password });
      return (0, import_node11.json)(result, {
        headers
      });
    } catch (e) {
      let error = extractNextError(e);
      throw (0, import_node11.json)(error, {
        status: error.statusCode
      });
    }
};
function Register({ error }) {
  useAuthRedirect();
  let actionData = (0, import_react59.useActionData)(), setUser = useSetUser();
  return useAuthRedirect(), (0, import_react60.useEffect)(() => {
    !actionData || setUser(actionData.user);
  }, [actionData, setUser]), /* @__PURE__ */ React.createElement(BasicLayout_default, {
    title: "\uD68C\uC6D0\uAC00\uC785",
    hasBackButton: !0,
    desktopHeaderVisible: !1
  }, /* @__PURE__ */ React.createElement(AuthForm_default, {
    mode: "register",
    error
  }));
}
function CatchBoundary3() {
  let caught = (0, import_react59.useCatch)();
  return /* @__PURE__ */ React.createElement(Register, {
    error: caught.data
  });
}

// route:/Users/public.velopert/workspace/veltrends/packages/veltrends-web/app/routes/auth/login.tsx
var login_exports = {};
__export(login_exports, {
  CatchBoundary: () => CatchBoundary4,
  action: () => action3,
  default: () => Login
});
var import_node12 = require("@remix-run/node"), import_react61 = require("@remix-run/react");
var import_react62 = require("react");
var action3 = async ({ request }) => {
  let form = await request.formData(), username = form.get("username"), password = form.get("password");
  if (!(typeof username != "string" || typeof password != "string"))
    try {
      let { headers, result } = await login({ username, password });
      return (0, import_node12.json)(result, {
        headers
      });
    } catch (e) {
      let error = extractNextError(e);
      throw (0, import_node12.json)(error, {
        status: error.statusCode
      });
    }
};
function Login({ error }) {
  let actionData = (0, import_react61.useActionData)(), setUser = useSetUser();
  return useAuthRedirect(), (0, import_react62.useEffect)(() => {
    !actionData || setUser(actionData.user);
  }, [actionData, setUser]), /* @__PURE__ */ React.createElement(BasicLayout_default, {
    title: "\uB85C\uADF8\uC778",
    hasBackButton: !0,
    desktopHeaderVisible: !1
  }, /* @__PURE__ */ React.createElement(AuthForm_default, {
    mode: "login",
    error
  }));
}
function CatchBoundary4() {
  let caught = (0, import_react61.useCatch)();
  return console.log(caught), /* @__PURE__ */ React.createElement(Login, {
    error: caught.data
  });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "1fa41156", entry: { module: "/build/entry.client-2525UBHH.js", imports: ["/build/_shared/chunk-RBPECNLB.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-AA6EWQ7M.js", imports: ["/build/_shared/chunk-HZO7RUK7.js", "/build/_shared/chunk-IIZIP42T.js", "/build/_shared/chunk-KPIKRPRU.js", "/build/_shared/chunk-LUNWPWLM.js", "/build/_shared/chunk-YPTGQNTU.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !1 }, "routes/auth": { id: "routes/auth", parentId: "root", path: "auth", index: void 0, caseSensitive: void 0, module: "/build/routes/auth-L3C33QLK.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth/login": { id: "routes/auth/login", parentId: "routes/auth", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/auth/login-QNYXSFON.js", imports: ["/build/_shared/chunk-ENZTJM6S.js", "/build/_shared/chunk-74USR6VX.js", "/build/_shared/chunk-2S4HI3FB.js", "/build/_shared/chunk-BVDGS5ZI.js", "/build/_shared/chunk-CKR5T5V4.js", "/build/_shared/chunk-DQUDZW62.js", "/build/_shared/chunk-YPTGQNTU.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !0, hasErrorBoundary: !1 }, "routes/auth/register": { id: "routes/auth/register", parentId: "routes/auth", path: "register", index: void 0, caseSensitive: void 0, module: "/build/routes/auth/register-KANODPQB.js", imports: ["/build/_shared/chunk-ENZTJM6S.js", "/build/_shared/chunk-74USR6VX.js", "/build/_shared/chunk-2S4HI3FB.js", "/build/_shared/chunk-BVDGS5ZI.js", "/build/_shared/chunk-CKR5T5V4.js", "/build/_shared/chunk-DQUDZW62.js", "/build/_shared/chunk-YPTGQNTU.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !0, hasErrorBoundary: !1 }, "routes/bookmarks": { id: "routes/bookmarks", parentId: "root", path: "bookmarks", index: void 0, caseSensitive: void 0, module: "/build/routes/bookmarks-GSJRXQQA.js", imports: ["/build/_shared/chunk-PITUA5TP.js", "/build/_shared/chunk-3YO3MSBZ.js", "/build/_shared/chunk-MSKQ73QQ.js", "/build/_shared/chunk-SPBA7GSM.js", "/build/_shared/chunk-YKAL664Y.js", "/build/_shared/chunk-DQUDZW62.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-WO7BSU77.js", imports: ["/build/_shared/chunk-PITUA5TP.js", "/build/_shared/chunk-3YO3MSBZ.js", "/build/_shared/chunk-MSKQ73QQ.js", "/build/_shared/chunk-SPBA7GSM.js", "/build/_shared/chunk-YKAL664Y.js", "/build/_shared/chunk-DQUDZW62.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/items/$itemId": { id: "routes/items/$itemId", parentId: "root", path: "items/:itemId", index: void 0, caseSensitive: void 0, module: "/build/routes/items/$itemId-DRKM35LL.js", imports: ["/build/_shared/chunk-3YO3MSBZ.js", "/build/_shared/chunk-MSKQ73QQ.js", "/build/_shared/chunk-CKR5T5V4.js", "/build/_shared/chunk-DQUDZW62.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/search": { id: "routes/search", parentId: "root", path: "search", index: void 0, caseSensitive: void 0, module: "/build/routes/search-73GZBTR5.js", imports: ["/build/_shared/chunk-SPBA7GSM.js", "/build/_shared/chunk-YKAL664Y.js", "/build/_shared/chunk-DQUDZW62.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/setting": { id: "routes/setting", parentId: "root", path: "setting", index: void 0, caseSensitive: void 0, module: "/build/routes/setting-LOWWCNLR.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/setting/account": { id: "routes/setting/account", parentId: "routes/setting", path: "account", index: void 0, caseSensitive: void 0, module: "/build/routes/setting/account-U6DU33AN.js", imports: ["/build/_shared/chunk-2S4HI3FB.js", "/build/_shared/chunk-BVDGS5ZI.js", "/build/_shared/chunk-CKR5T5V4.js", "/build/_shared/chunk-KPIKRPRU.js", "/build/_shared/chunk-LUNWPWLM.js", "/build/_shared/chunk-DQUDZW62.js", "/build/_shared/chunk-YPTGQNTU.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/setting/index": { id: "routes/setting/index", parentId: "routes/setting", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/setting/index-QGRSV2CJ.js", imports: ["/build/_shared/chunk-YKAL664Y.js", "/build/_shared/chunk-DQUDZW62.js", "/build/_shared/chunk-YPTGQNTU.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/write": { id: "routes/write", parentId: "root", path: "write", index: void 0, caseSensitive: void 0, module: "/build/routes/write-SPHAKPE5.js", imports: ["/build/_shared/chunk-5BDNLOZP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/write/edit": { id: "routes/write/edit", parentId: "routes/write", path: "edit", index: void 0, caseSensitive: void 0, module: "/build/routes/write/edit-QSCN2D7C.js", imports: ["/build/_shared/chunk-PJ2MYITP.js", "/build/_shared/chunk-LHRTGWTE.js", "/build/_shared/chunk-74USR6VX.js", "/build/_shared/chunk-MSKQ73QQ.js", "/build/_shared/chunk-BVDGS5ZI.js", "/build/_shared/chunk-CKR5T5V4.js", "/build/_shared/chunk-DQUDZW62.js", "/build/_shared/chunk-YPTGQNTU.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/write/index": { id: "routes/write/index", parentId: "routes/write", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/write/index-4AREB6IZ.js", imports: ["/build/_shared/chunk-LHRTGWTE.js", "/build/_shared/chunk-74USR6VX.js", "/build/_shared/chunk-BVDGS5ZI.js", "/build/_shared/chunk-CKR5T5V4.js", "/build/_shared/chunk-DQUDZW62.js", "/build/_shared/chunk-YPTGQNTU.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/write/intro": { id: "routes/write/intro", parentId: "routes/write", path: "intro", index: void 0, caseSensitive: void 0, module: "/build/routes/write/intro-BBTGGGNW.js", imports: ["/build/_shared/chunk-PJ2MYITP.js", "/build/_shared/chunk-LHRTGWTE.js", "/build/_shared/chunk-74USR6VX.js", "/build/_shared/chunk-MSKQ73QQ.js", "/build/_shared/chunk-2S4HI3FB.js", "/build/_shared/chunk-BVDGS5ZI.js", "/build/_shared/chunk-CKR5T5V4.js", "/build/_shared/chunk-DQUDZW62.js", "/build/_shared/chunk-YPTGQNTU.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !0, hasErrorBoundary: !1 } }, url: "/build/manifest-1FA41156.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/items/$itemId": {
    id: "routes/items/$itemId",
    parentId: "root",
    path: "items/:itemId",
    index: void 0,
    caseSensitive: void 0,
    module: itemId_exports
  },
  "routes/bookmarks": {
    id: "routes/bookmarks",
    parentId: "root",
    path: "bookmarks",
    index: void 0,
    caseSensitive: void 0,
    module: bookmarks_exports
  },
  "routes/setting": {
    id: "routes/setting",
    parentId: "root",
    path: "setting",
    index: void 0,
    caseSensitive: void 0,
    module: setting_exports
  },
  "routes/setting/account": {
    id: "routes/setting/account",
    parentId: "routes/setting",
    path: "account",
    index: void 0,
    caseSensitive: void 0,
    module: account_exports
  },
  "routes/setting/index": {
    id: "routes/setting/index",
    parentId: "routes/setting",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: setting_exports2
  },
  "routes/search": {
    id: "routes/search",
    parentId: "root",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: search_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/write": {
    id: "routes/write",
    parentId: "root",
    path: "write",
    index: void 0,
    caseSensitive: void 0,
    module: write_exports
  },
  "routes/write/index": {
    id: "routes/write/index",
    parentId: "routes/write",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: write_exports2
  },
  "routes/write/intro": {
    id: "routes/write/intro",
    parentId: "routes/write",
    path: "intro",
    index: void 0,
    caseSensitive: void 0,
    module: intro_exports
  },
  "routes/write/edit": {
    id: "routes/write/edit",
    parentId: "routes/write",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports
  },
  "routes/auth": {
    id: "routes/auth",
    parentId: "root",
    path: "auth",
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/auth/register": {
    id: "routes/auth/register",
    parentId: "routes/auth",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: register_exports
  },
  "routes/auth/login": {
    id: "routes/auth/login",
    parentId: "routes/auth",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=index.js.map
