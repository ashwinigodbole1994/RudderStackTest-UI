const _1_SECOND = 1000; // 1 milliseconds
const _1_MINUTE = _1_SECOND * 60;
export default {
    defaultTimeOut: _1_MINUTE,
    smallWait: 20000,
    defaultRetryInterval: 2000,
    trimApiValues: true,
    sanitizeWhitespaceInApiValues: true,
    longTimeOut: _1_MINUTE * 1.5,
    Spec_10_Minute_TimeOut: _1_MINUTE * 10,
    Spec_15_Minute_TimeOut: _1_MINUTE * 15,
    Spec_20_Minute_TimeOut: _1_MINUTE * 20,
    Spec_30_Minute_TimeOut: _1_MINUTE * 30,
    Spec_60_Minute_TimeOut: _1_MINUTE * 60
}

export const TIMEOUTS = {
    ONE_SECOND: _1_SECOND,
    ONE_MINUTE: _1_MINUTE,
    TEN_MINUTES: _1_MINUTE * 10,
    SIXTY_MINUTES: _1_MINUTE * 60,
    ONE_HOUR: _1_MINUTE *60,
    ONE_DAY: _1_MINUTE * 60 * 24,
    POLLING_INTERVAL: _1_SECOND * 2,
    ELEMENT_PRESENT : _1_SECOND * 60 * 1.5,
    ELEMENT_VISIBILITY : _1_SECOND * 60 * 1.5,
    ELEMENT_INVISIBILITY : _1_SECOND * 10,
    THIRTY_FIVE_MINUTES: _1_MINUTE * 35,
};

export const WAIT_FOR = {
    ELEMENT_PRESENT: "PRESENT",
    ELEMENT_DISPLAYED: "DISPLAYED",
    ELEMENT_INVISIBILITY: "INVISIBLE",
    ELEMENT_CLICKABLE: "CLICKABLE",
    ELEMENT_STALE: "STALE",
    ELEMENT_ENABLED: "ENABLED",
    ELEMENT_NOT_PRESENT: "ELEMENT_NOT_PRESENT",
};

export const MOUSE_ACTIONS = {
    MOUSE_HOVER: "MOUSE_HOVER",
    MOUSE_DOWN: "MOUSE_DOWN",
    MOUSE_UP: "MOUSE_UP",
    // DRAG_DROP: "DRAG_DROP",
    DOUBLE_CLICK: "DOUBLE_CLICK",
    MOUSE_OUT: "MOUSE_OUT",
};

export const ATTRIBUTES = {
    ID: "id",
    CLASS: "className",
    TAG: "tagName",
};

export const ROOT_DIR = __dirname;
