import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Tos() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              By accessing and using this Movie Reservation System, you accept
              and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do
              not use this service.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Movie Reservations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Booking</h3>
              <p className="text-sm text-muted-foreground">
                All movie reservations must be completed through our platform.
                We reserve the right to confirm, modify, or cancel any
                reservation at our discretion. A confirmation email will be sent
                upon successful booking.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-sm mb-2">Pricing</h3>
              <p className="text-sm text-muted-foreground">
                Ticket prices are subject to change without notice. All prices
                are displayed in the currency of your region. Additional fees
                may apply for special screenings or premium formats.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-sm mb-2">
                Cancellation & Refunds
              </h3>
              <p className="text-sm text-muted-foreground">
                Cancellations must be made at least 2 hours before the scheduled
                showtime. Refunds will be processed within 5-7 business days. No
                refunds are available for no-shows.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. User Account Responsibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              You are responsible for maintaining the confidentiality of your
              account login information and password. You agree to accept
              responsibility for all activities that occur under your account.
              You must notify us immediately of any unauthorized use of your
              account.
            </p>
            <p className="text-sm text-muted-foreground">
              Users must be at least 13 years old to create an account. For
              ticket purchases requiring age restrictions, you agree to provide
              accurate age information.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Intellectual Property Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All content on this platform, including movie titles,
              descriptions, images, and logos, are protected by copyright laws.
              Unauthorized use, reproduction, or distribution is prohibited.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The Movie Reservation System is provided on an "as-is" basis. We
              are not liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use or
              inability to use the service, including technical issues, data
              loss, or missed screenings.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Code of Conduct</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">You agree not to:</p>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
              <li>Make fraudulent or duplicate reservations</li>
              <li>Use automated tools to manipulate booking systems</li>
              <li>Harass theater staff or other moviegoers</li>
              <li>Record or transmit movies without permission</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We reserve the right to modify these Terms of Service at any time.
              Changes will be effective immediately upon posting to the website.
              Continued use of the service following any changes constitutes
              your acceptance of the new terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you have any questions about these Terms of Service, please
              contact our support team at support@moviereservation.com or call
              our customer service hotline.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
