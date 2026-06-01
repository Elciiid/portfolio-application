import { redirect } from "next/navigation";

// Case study pages are not live. Redirect any direct navigation back to home.
export default function ProjectPage() {
  redirect("/#projects");
}
