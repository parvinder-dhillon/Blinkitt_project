export const validURLConvert = (name) => {
    if (!name) return "";

    return name
        .toString()
        .replaceAll(" ", "-")
        .replaceAll(",", "-")
        .replaceAll("&", "-");
}