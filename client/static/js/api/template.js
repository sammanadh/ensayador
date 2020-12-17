/**
 * Retreives html template for components
 * 
 * @returns {string}
 */
export default async (url) => {
    const res = await fetch(url);
    const jsonRes = await res.json();
    return jsonRes.data;
}