export async function submitForm(
  formData: Record<string, string>,
  subject: string
): Promise<{ success: boolean; message: string }> {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_KEY_HERE",
      from_name: "Andrean Rachmat Website",
      subject,
      ...formData,
    }),
  });
  const result = await response.json();
  return {
    success: result.success ?? false,
    message: result.message ?? "",
  };
}
