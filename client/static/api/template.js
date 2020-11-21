export default async (url) => {
    const res = await fetch(url);
    const jsonRes = await res.json();
    return jsonRes.data;
}