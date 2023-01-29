resource "google_cloud_run_service" "aggregator_ms" {
  name     = "${var.environment}-event-aggregator-ms"
  location = var.gcp_project_location

  template {
    spec {
      containers {
        # TODO: To be replaced with a better version name
        image = "europe-west2-docker.pkg.dev/${data.google_project.project.project_id}/${var.environment}/analytics-ms:latest"
        ports {
          container_port = 3000
        }

        resources {
          limits = tomap({
            memory = "2Gi"
          })
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}