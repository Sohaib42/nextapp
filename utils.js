export function decodeToken(token) {
    const [header, payload, signature] = token.split('.');
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));
    return { header: decodedHeader, payload: decodedPayload };
}