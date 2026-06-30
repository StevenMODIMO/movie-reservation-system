import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Privacy Policy
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Privacy Policy for Our Movie Reservation System
        </h1>
        <p className="text-muted-foreground">Last updated: June 30, 2026</p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
          <CardDescription>
            We value your privacy and are committed to protecting the personal
            information you share when you book movie tickets, manage
            reservations, or use our platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            This Privacy Policy explains what information we collect, how we use
            it, and the choices you have regarding your data while using our
            movie reservation system.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Information We Collect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Account details such as your name, email address, and password.
            </li>
            <li>
              Booking information including selected movie, showtime, seat
              numbers, and order history.
            </li>
            <li>
              Payment details required to complete ticket purchases, processed
              securely through trusted payment providers.
            </li>
            <li>
              Device and usage data such as browser type, IP address, and
              interaction with our reservation pages.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ul className="list-disc space-y-2 pl-5">
            <li>To create and manage your account and reservation bookings.</li>
            <li>
              To confirm tickets, send reminders, and provide updates about
              movie showtimes or cancellations.
            </li>
            <li>
              To improve our booking experience, website performance, and
              customer support.
            </li>
            <li>
              To comply with legal obligations and protect against fraud or
              misuse of our services.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sharing of Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            We may share limited information with service providers that help us
            process payments, host our platform, or send confirmations. We do
            not sell your personal information to third parties.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Choices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            You can update your account information, unsubscribe from
            promotional emails, or request access to the personal data we hold
            about you by contacting our support team.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            If you have any questions about this Privacy Policy or how your data
            is handled within our movie reservation system, please contact us
            through the support section of our platform.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
