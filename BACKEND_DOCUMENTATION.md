# Balance Real Estate - Backend Documentation (ASP.NET Core)

## Overview
This document provides comprehensive requirements for the Balance Real Estate backend system using ASP.NET Core, supporting Arabic/English bilingual content and real-time features.

## Technology Stack
- **Framework**: ASP.NET Core 8.0+
- **Database**: SQL Server
- **code first**: Entity Framework Core
- **Authentication**: JWT with ASP.NET Core Identity
- **Real-time**: SignalR
- **Localization**: Built-in .NET Localization
- **File Storage**: cloudinary / Local Storage
- **Email**: SendGrid / SMTP
- **Caching**: Redis Cache (optional)


## Database Schema & Entities

### 1. User Management & Roles

```csharp
// User Entity
public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Avatar { get; set; }
    public string? Bio { get; set; }
    public string? Location { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public bool IsActive { get; set; }
    public bool IsThirdPartyAuth { get; set; }
    
    // Navigation Properties
    public ICollection<UserFavorite> Favorites { get; set; }
    public ICollection<UserInterest> Interests { get; set; }
    public ICollection<FormSubmission> FormSubmissions { get; set; }
    public ICollection<TaskAssignment> AssignedTasks { get; set; }
    public ICollection<ProjectAssignment> ProjectAssignments { get; set; }
    public ICollection<PropertyAssignment> PropertyAssignments { get; set; }
}

// Roles: Guest, User, Employee, Admin, SuperAdmin
public static class AppRoles
{
    public const string Guest = "Guest";
    public const string User = "User";
    public const string Employee = "Employee";
    public const string Admin = "Admin";
    public const string SuperAdmin = "SuperAdmin";
}
```

### 2. Projects & Properties

```csharp
public class Project
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string NameAr { get; set; }
    public string Description { get; set; }
    public string DescriptionAr { get; set; }
    public string Location { get; set; }
    public string LocationAr { get; set; }
    public string District { get; set; }
    public string DistrictAr { get; set; }
    public string City { get; set; }
    public string CityAr { get; set; }
    public string Category { get; set; }
    public string CategoryAr { get; set; }
    public string Status { get; set; } // Available, ComingSoon, Completed
    public DateTime CompletionDate { get; set; }
    public string MainImage { get; set; }
    public decimal? PriceFrom { get; set; }
    public decimal? PriceTo { get; set; }
    public string? VideoUrl { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Address { get; set; }
    public string AddressAr { get; set; }
    public int TotalUnits { get; set; }
    public string TotalArea { get; set; }
    public int ParkingSpaces { get; set; }
    public int Elevators { get; set; }
    public string Features { get; set; } // JSON array
    public string FeaturesAr { get; set; } // JSON array
    public string Slug { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    // Navigation Properties
    public ICollection<ProjectImage> Images { get; set; }
    public ICollection<Property> Properties { get; set; }
    public ICollection<ProjectNote> Notes { get; set; }
    public ICollection<ProjectAssignment> Assignments { get; set; }
    public ICollection<UserInterest> Interests { get; set; }
    public ICollection<UserFavorite> Favorites { get; set; }
}

public class Property
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Name { get; set; }
    public string NameAr { get; set; }
    public string Type { get; set; } // Apartment, Villa, Office, etc.
    public string TypeAr { get; set; }
    public decimal Price { get; set; }
    public string PriceType { get; set; } // Sale, Rent
    public decimal Area { get; set; }
    public int Bedrooms { get; set; }
    public int Bathrooms { get; set; }
    public int Floor { get; set; }
    public string Building { get; set; }
    public string BuildingAr { get; set; }
    public string Status { get; set; } // Available, Sold, Reserved
    public string Features { get; set; } // JSON array
    public string FeaturesAr { get; set; } // JSON array
    public string Amenities { get; set; } // JSON array
    public string AmenitiesAr { get; set; } // JSON array
    public string MainImage { get; set; }
    public string Description { get; set; }
    public string DescriptionAr { get; set; }
    public string Highlights { get; set; } // JSON array
    public string HighlightsAr { get; set; } // JSON array
    public int? YearBuilt { get; set; }
    public string Availability { get; set; }
    public string? VirtualTourUrl { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    // Navigation Properties
    public Project Project { get; set; }
    public ICollection<PropertyImage> Images { get; set; }
    public ICollection<PropertyVideo> Videos { get; set; }
    public ICollection<PropertyNote> Notes { get; set; }
    public ICollection<PropertyAssignment> Assignments { get; set; }
    public ICollection<UserInterest> Interests { get; set; }
    public ICollection<UserFavorite> Favorites { get; set; }
}
```

### 3. Content Management

```csharp
public class ContentSection
{
    public int Id { get; set; }
    public string SectionKey { get; set; } // hero_section, about_us, footer_contact, etc.
    public string Title { get; set; }
    public string TitleAr { get; set; }
    public string Subtitle { get; set; }
    public string SubtitleAr { get; set; }
    public string Content { get; set; }
    public string ContentAr { get; set; }
    public string? ImageUrl { get; set; }
    public string? VideoUrl { get; set; }
    public string? CtaText { get; set; }
    public string? CtaTextAr { get; set; }
    public string? CtaLink { get; set; }
    public string? BackgroundImage { get; set; }
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UpdatedBy { get; set; }
}

public class ContactInfo
{
    public int Id { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }
    public string AddressAr { get; set; }
    public string WorkingHours { get; set; }
    public string WorkingHoursAr { get; set; }
    public string? WhatsApp { get; set; }
    public string? Facebook { get; set; }
    public string? Instagram { get; set; }
    public string? Twitter { get; set; }
    public string? LinkedIn { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UpdatedBy { get; set; }
}

public class CompanyInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string NameAr { get; set; }
    public string Description { get; set; }
    public string DescriptionAr { get; set; }
    public string Mission { get; set; }
    public string MissionAr { get; set; }
    public string Vision { get; set; }
    public string VisionAr { get; set; }
    public string Values { get; set; } // JSON array
    public string ValuesAr { get; set; } // JSON array
    public string? LogoUrl { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UpdatedBy { get; set; }
}
```

### 4. Forms & Submissions

```csharp
public class FormSubmission
{
    public int Id { get; set; }
    public string FormType { get; set; } // Contact, Interest, Newsletter, etc.
    public string UserId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
    public int? ProjectId { get; set; }
    public int? PropertyId { get; set; }
    public string InquiryType { get; set; }
    public string PreferredContact { get; set; }
    public DateTime? PreferredVisitDate { get; set; }
    public int? NumberOfPeople { get; set; }
    public string Status { get; set; } // New, InProgress, Completed, Archived
    public string? AssignedTo { get; set; }
    public string? AdminNotes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ProcessedAt { get; set; }
    
    // Navigation Properties
    public User User { get; set; }
    public Project Project { get; set; }
    public Property Property { get; set; }
    public User AssignedUser { get; set; }
}

public class EmailSettings
{
    public int Id { get; set; }
    public string SmtpHost { get; set; }
    public int SmtpPort { get; set; }
    public string SmtpUsername { get; set; }
    public string SmtpPassword { get; set; }
    public string FromEmail { get; set; }
    public string FromName { get; set; }
    public string FromNameAr { get; set; }
    public bool EnableSsl { get; set; }
    public bool IsActive { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UpdatedBy { get; set; }
}
```

### 5. Tasks & Assignments

```csharp
public class TaskAssignment
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string TitleAr { get; set; }
    public string Description { get; set; }
    public string DescriptionAr { get; set; }
    public string AssignedBy { get; set; }
    public string AssignedTo { get; set; }
    public string Priority { get; set; } // Low, Medium, High, Urgent
    public string Status { get; set; } // Pending, InProgress, Completed, Cancelled
    public DateTime DueDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string? CompletionNotes { get; set; }
    
    // Navigation Properties
    public User AssignedByUser { get; set; }
    public User AssignedToUser { get; set; }
    public ICollection<TaskResponse> Responses { get; set; }
}

public class TaskResponse
{
    public int Id { get; set; }
    public int TaskId { get; set; }
    public string UserId { get; set; }
    public string Response { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // Navigation Properties
    public TaskAssignment Task { get; set; }
    public User User { get; set; }
}

public class ProjectAssignment
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string UserId { get; set; }
    public string AssignedBy { get; set; }
    public DateTime AssignedAt { get; set; }
    public bool IsActive { get; set; }
    
    // Navigation Properties
    public Project Project { get; set; }
    public User User { get; set; }
    public User AssignedByUser { get; set; }
}

public class PropertyAssignment
{
    public int Id { get; set; }
    public int PropertyId { get; set; }
    public string UserId { get; set; }
    public string AssignedBy { get; set; }
    public DateTime AssignedAt { get; set; }
    public bool IsActive { get; set; }
    
    // Navigation Properties
    public Property Property { get; set; }
    public User User { get; set; }
    public User AssignedByUser { get; set; }
}
```

### 6. Notes & Tracking

```csharp
public class ProjectNote
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string UserId { get; set; }
    public string Note { get; set; }
    public string NoteType { get; set; } // General, Important, Issue, Update
    public DateTime CreatedAt { get; set; }
    public bool IsPrivate { get; set; }
    
    // Navigation Properties
    public Project Project { get; set; }
    public User User { get; set; }
}

public class PropertyNote
{
    public int Id { get; set; }
    public int PropertyId { get; set; }
    public string UserId { get; set; }
    public string Note { get; set; }
    public string NoteType { get; set; } // General, Important, Issue, Update
    public DateTime CreatedAt { get; set; }
    public bool IsPrivate { get; set; }
    
    // Navigation Properties
    public Property Property { get; set; }
    public User User { get; set; }
}

public class UserFavorite
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public int? ProjectId { get; set; }
    public int? PropertyId { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // Navigation Properties
    public User User { get; set; }
    public Project Project { get; set; }
    public Property Property { get; set; }
}

public class UserInterest
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public int? ProjectId { get; set; }
    public int? PropertyId { get; set; }
    public string InterestType { get; set; } // Purchase, Rent, Investment
    public string ContactPreference { get; set; } // Phone, Email, WhatsApp
    public DateTime? PreferredContactTime { get; set; }
    public string Message { get; set; }
    public string Status { get; set; } // New, Contacted, InProgress, Closed
    public DateTime CreatedAt { get; set; }
    
    // Navigation Properties
    public User User { get; set; }
    public Project Project { get; set; }
    public Property Property { get; set; }
}
```

### 7. Media & Files

```csharp
public class ProjectImage
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string ImageUrl { get; set; }
    public string? Alt { get; set; }
    public string? AltAr { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsMain { get; set; }
    
    // Navigation Properties
    public Project Project { get; set; }
}

public class PropertyImage
{
    public int Id { get; set; }
    public int PropertyId { get; set; }
    public string ImageUrl { get; set; }
    public string? Alt { get; set; }
    public string? AltAr { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsMain { get; set; }
    
    // Navigation Properties
    public Property Property { get; set; }
}

public class PropertyVideo
{
    public int Id { get; set; }
    public int PropertyId { get; set; }
    public string VideoUrl { get; set; }
    public string? Thumbnail { get; set; }
    public string? Title { get; set; }
    public string? TitleAr { get; set; }
    public int DisplayOrder { get; set; }
    
    // Navigation Properties
    public Property Property { get; set; }
}
```

### 8. Notifications & Analytics

```csharp
public class Notification
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public string Title { get; set; }
    public string TitleAr { get; set; }
    public string Message { get; set; }
    public string MessageAr { get; set; }
    public string Type { get; set; } // Info, Warning, Success, Error
    public string? ActionUrl { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ReadAt { get; set; }
    
    // Navigation Properties
    public User User { get; set; }
}

public class Analytics
{
    public int Id { get; set; }
    public string EventType { get; set; } // PageView, PropertyView, ProjectView, FormSubmission
    public string? UserId { get; set; }
    public int? ProjectId { get; set; }
    public int? PropertyId { get; set; }
    public string? IpAddress { get; set; }
    public string? UserAgent { get; set; }
    public string? RefererUrl { get; set; }
    public string? SessionId { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // Navigation Properties
    public User User { get; set; }
    public Project Project { get; set; }
    public Property Property { get; set; }
}
```

## API Endpoints Structure

### Authentication & User Management

```csharp
// Auth Controller
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request);
    
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request);
    
    [HttpPost("refresh-token")]
    public async Task<ActionResult<AuthResponse>> RefreshToken(RefreshTokenRequest request);
    
    [HttpPost("forgot-password")]
    public async Task<ActionResult> ForgotPassword(ForgotPasswordRequest request);
    
    [HttpPost("reset-password")]
    public async Task<ActionResult> ResetPassword(ResetPasswordRequest request);
    
    [HttpPost("change-password")]
    [Authorize]
    public async Task<ActionResult> ChangePassword(ChangePasswordRequest request);
    
    [HttpGet("profile")]
    [Authorize]
    public async Task<ActionResult<UserProfileResponse>> GetProfile();
    
    [HttpPut("profile")]
    [Authorize]
    public async Task<ActionResult<UserProfileResponse>> UpdateProfile(UpdateProfileRequest request);
}

// User Management Controller (Admin/SuperAdmin only)
[Route("api/admin/[controller]")]
[Authorize(Roles = "Admin,SuperAdmin")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<UserSummary>>> GetUsers([FromQuery] UserFilterRequest filter);
    
    [HttpGet("{userId}")]
    public async Task<ActionResult<UserDetailsResponse>> GetUser(string userId);
    
    [HttpPut("{userId}/role")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<ActionResult> UpdateUserRole(string userId, UpdateRoleRequest request);
    
    [HttpPut("{userId}/status")]
    public async Task<ActionResult> UpdateUserStatus(string userId, UpdateUserStatusRequest request);
    
    [HttpDelete("{userId}")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<ActionResult> DeleteUser(string userId);
}
```

### Projects & Properties

```csharp
// Projects Controller
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<ProjectSummary>>> GetProjects([FromQuery] ProjectFilterRequest filter);
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDetailsResponse>> GetProject(int id);
    
    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<ProjectDetailsResponse>> GetProjectBySlug(string slug);
    
    [HttpPost]
    [Authorize(Roles = "Employee,Admin,SuperAdmin")]
    public async Task<ActionResult<ProjectDetailsResponse>> CreateProject(CreateProjectRequest request);
    
    [HttpPut("{id}")]
    [Authorize(Roles = "Employee,Admin,SuperAdmin")]
    public async Task<ActionResult<ProjectDetailsResponse>> UpdateProject(int id, UpdateProjectRequest request);
    
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<ActionResult> DeleteProject(int id);
    
    [HttpPost("{id}/images")]
    [Authorize(Roles = "Employee,Admin,SuperAdmin")]
    public async Task<ActionResult<ProjectImageResponse>> AddProjectImage(int id, IFormFile file);
    
    [HttpDelete("{id}/images/{imageId}")]
    [Authorize(Roles = "Employee,Admin,SuperAdmin")]
    public async Task<ActionResult> DeleteProjectImage(int id, int imageId);
    
    [HttpGet("{id}/properties")]
    public async Task<ActionResult<PagedResult<PropertySummary>>> GetProjectProperties(int id, [FromQuery] PropertyFilterRequest filter);
    
    [HttpPost("{id}/favorite")]
    [Authorize]
    public async Task<ActionResult> ToggleFavorite(int id);
    
    [HttpPost("{id}/interest")]
    [Authorize]
    public async Task<ActionResult> RegisterInterest(int id, RegisterInterestRequest request);
    
    [HttpGet("{id}/notes")]
    [Authorize(Roles = "Employee,Admin,SuperAdmin")]
    public async Task<ActionResult<List<ProjectNoteResponse>>> GetProjectNotes(int id);
    
    [HttpPost("{id}/notes")]
    [Authorize(Roles = "Employee,Admin,SuperAdmin")]
    public async Task<ActionResult<ProjectNoteResponse>> AddProjectNote(int id, AddNoteRequest request);
}

// Properties Controller
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<PropertySummary>>> GetProperties([FromQuery] PropertyFilterRequest filter);
    
    [HttpGet("{id}")]
    public async Task<ActionResult<PropertyDetailsResponse>> GetProperty(int id);
    
    [HttpPost]
    [Authorize(Roles = "Employee,Admin,SuperAdmin")]
    public async Task<ActionResult<PropertyDetailsResponse>> CreateProperty(CreatePropertyRequest request);
    
    [HttpPut("{id}")]
    [Authorize(Roles = "Employee,Admin,SuperAdmin")]
    public async Task<ActionResult<PropertyDetailsResponse>> UpdateProperty(int id, UpdatePropertyRequest request);
    
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<ActionResult> DeleteProperty(int id);
    
    [HttpPost("{id}/images")]
    [Authorize(Roles = "Employee,Admin,SuperAdmin")]
    public async Task<ActionResult<PropertyImageResponse>> AddPropertyImage(int id, IFormFile file);
    
    [HttpPost("{id}/videos")]
    [Authorize(Roles = "Employee,Admin,SuperAdmin")]
    public async Task<ActionResult<PropertyVideoResponse>> AddPropertyVideo(int id, AddVideoRequest request);
    
    [HttpPost("{id}/favorite")]
    [Authorize]
    public async Task<ActionResult> ToggleFavorite(int id);
    
    [HttpPost("{id}/interest")]
    [Authorize]
    public async Task<ActionResult> RegisterInterest(int id, RegisterInterestRequest request);
    
    [HttpGet("{id}/notes")]
    [Authorize(Roles = "Employee,Admin,SuperAdmin")]
    public async Task<ActionResult<List<PropertyNoteResponse>>> GetPropertyNotes(int id);
    
    [HttpPost("{id}/notes")]
    [Authorize(Roles = "Employee,Admin,SuperAdmin")]
    public async Task<ActionResult<PropertyNoteResponse>> AddPropertyNote(int id, AddNoteRequest request);
}
```

### Content Management

```csharp
// Content Management Controller
[Route("api/admin/[controller]")]
[Authorize(Roles = "Admin,SuperAdmin")]
public class ContentController : ControllerBase
{
    [HttpGet("sections")]
    public async Task<ActionResult<List<ContentSectionResponse>>> GetContentSections();
    
    [HttpGet("sections/{sectionKey}")]
    public async Task<ActionResult<ContentSectionResponse>> GetContentSection(string sectionKey);
    
    [HttpPut("sections/{sectionKey}")]
    public async Task<ActionResult<ContentSectionResponse>> UpdateContentSection(string sectionKey, UpdateContentSectionRequest request);
    
    [HttpGet("contact-info")]
    public async Task<ActionResult<ContactInfoResponse>> GetContactInfo();
    
    [HttpPut("contact-info")]
    public async Task<ActionResult<ContactInfoResponse>> UpdateContactInfo(UpdateContactInfoRequest request);
    
    [HttpGet("company-info")]
    public async Task<ActionResult<CompanyInfoResponse>> GetCompanyInfo();
    
    [HttpPut("company-info")]
    public async Task<ActionResult<CompanyInfoResponse>> UpdateCompanyInfo(UpdateCompanyInfoRequest request);
    
    [HttpGet("email-settings")]
    public async Task<ActionResult<EmailSettingsResponse>> GetEmailSettings();
    
    [HttpPut("email-settings")]
    public async Task<ActionResult<EmailSettingsResponse>> UpdateEmailSettings(UpdateEmailSettingsRequest request);
}
```

### Forms & Communications

```csharp
// Forms Controller
[Route("api/[controller]")]
public class FormsController : ControllerBase
{
    [HttpPost("contact")]
    public async Task<ActionResult> SubmitContactForm(ContactFormRequest request);
    
    [HttpPost("interest")]
    [Authorize]
    public async Task<ActionResult> SubmitInterestForm(InterestFormRequest request);
    
    [HttpPost("newsletter")]
    public async Task<ActionResult> SubscribeNewsletter(NewsletterSubscriptionRequest request);
}

// Form Management Controller (Admin)
[Route("api/admin/[controller]")]
[Authorize(Roles = "Employee,Admin,SuperAdmin")]
public class FormSubmissionsController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<FormSubmissionSummary>>> GetSubmissions([FromQuery] FormSubmissionFilterRequest filter);
    
    [HttpGet("{id}")]
    public async Task<ActionResult<FormSubmissionDetailsResponse>> GetSubmission(int id);
    
    [HttpPut("{id}/status")]
    public async Task<ActionResult> UpdateSubmissionStatus(int id, UpdateSubmissionStatusRequest request);
    
    [HttpPut("{id}/assign")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<ActionResult> AssignSubmission(int id, AssignSubmissionRequest request);
    
    [HttpPost("bulk-email")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<ActionResult> SendBulkEmail(BulkEmailRequest request);
}
```

### Tasks & Assignments

```csharp
// Tasks Controller
[Route("api/admin/[controller]")]
[Authorize(Roles = "Employee,Admin,SuperAdmin")]
public class TasksController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<TaskSummary>>> GetTasks([FromQuery] TaskFilterRequest filter);
    
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDetailsResponse>> GetTask(int id);
    
    [HttpPost]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<ActionResult<TaskDetailsResponse>> CreateTask(CreateTaskRequest request);
    
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<ActionResult<TaskDetailsResponse>> UpdateTask(int id, UpdateTaskRequest request);
    
    [HttpPut("{id}/status")]
    public async Task<ActionResult> UpdateTaskStatus(int id, UpdateTaskStatusRequest request);
    
    [HttpPost("{id}/responses")]
    public async Task<ActionResult<TaskResponseResponse>> AddTaskResponse(int id, AddTaskResponseRequest request);
    
    [HttpGet("{id}/responses")]
    public async Task<ActionResult<List<TaskResponseResponse>>> GetTaskResponses(int id);
}

// Assignments Controller
[Route("api/admin/[controller]")]
[Authorize(Roles = "Admin,SuperAdmin")]
public class AssignmentsController : ControllerBase
{
    [HttpPost("projects")]
    public async Task<ActionResult> AssignProject(AssignProjectRequest request);
    
    [HttpPost("properties")]
    public async Task<ActionResult> AssignProperty(AssignPropertyRequest request);
    
    [HttpGet("users/{userId}/projects")]
    public async Task<ActionResult<List<ProjectAssignmentResponse>>> GetUserProjectAssignments(string userId);
    
    [HttpGet("users/{userId}/properties")]
    public async Task<ActionResult<List<PropertyAssignmentResponse>>> GetUserPropertyAssignments(string userId);
    
    [HttpDelete("projects/{assignmentId}")]
    public async Task<ActionResult> RemoveProjectAssignment(int assignmentId);
    
    [HttpDelete("properties/{assignmentId}")]
    public async Task<ActionResult> RemovePropertyAssignment(int assignmentId);
}
```

### Analytics & Reporting

```csharp
// Analytics Controller
[Route("api/admin/[controller]")]
[Authorize(Roles = "Admin,SuperAdmin")]
public class AnalyticsController : ControllerBase
{
    [HttpGet("dashboard")]
    public async Task<ActionResult<DashboardAnalyticsResponse>> GetDashboardAnalytics();
    
    [HttpGet("projects/performance")]
    public async Task<ActionResult<List<ProjectPerformanceResponse>>> GetProjectsPerformance([FromQuery] DateRangeRequest dateRange);
    
    [HttpGet("properties/performance")]
    public async Task<ActionResult<List<PropertyPerformanceResponse>>> GetPropertiesPerformance([FromQuery] DateRangeRequest dateRange);
    
    [HttpGet("users/activity")]
    public async Task<ActionResult<UserActivityResponse>> GetUserActivity([FromQuery] DateRangeRequest dateRange);
    
    [HttpGet("forms/statistics")]
    public async Task<ActionResult<FormStatisticsResponse>> GetFormStatistics([FromQuery] DateRangeRequest dateRange);
    
    [HttpPost("track-event")]
    public async Task<ActionResult> TrackEvent(TrackEventRequest request);
}
```

## Response DTOs Examples

```csharp
// Authentication Responses
public class AuthResponse
{
    public string Token { get; set; }
    public string RefreshToken { get; set; }
    public DateTime ExpiresAt { get; set; }
    public UserProfileResponse User { get; set; }
}

public class UserProfileResponse
{
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Avatar { get; set; }
    public string Bio { get; set; }
    public string Location { get; set; }
    public List<string> Roles { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public bool IsThirdPartyAuth { get; set; }
}

// Project Responses
public class ProjectDetailsResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string NameAr { get; set; }
    public string Description { get; set; }
    public string DescriptionAr { get; set; }
    public string Location { get; set; }
    public string LocationAr { get; set; }
    public string District { get; set; }
    public string DistrictAr { get; set; }
    public string City { get; set; }
    public string CityAr { get; set; }
    public string Category { get; set; }
    public string CategoryAr { get; set; }
    public string Status { get; set; }
    public DateTime CompletionDate { get; set; }
    public string MainImage { get; set; }
    public decimal? PriceFrom { get; set; }
    public decimal? PriceTo { get; set; }
    public string VideoUrl { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Address { get; set; }
    public string AddressAr { get; set; }
    public int TotalUnits { get; set; }
    public string TotalArea { get; set; }
    public int ParkingSpaces { get; set; }
    public int Elevators { get; set; }
    public List<string> Features { get; set; }
    public List<string> FeaturesAr { get; set; }
    public string Slug { get; set; }
    public List<ProjectImageResponse> Images { get; set; }
    public List<PropertySummary> Properties { get; set; }
    public bool IsFavorited { get; set; }
    public bool HasUserInterest { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

// Dashboard Analytics Response
public class DashboardAnalyticsResponse
{
    public int TotalProjects { get; set; }
    public int ActiveProjects { get; set; }
    public int TotalProperties { get; set; }
    public int AvailableProperties { get; set; }
    public int TotalUsers { get; set; }
    public int NewUsersThisMonth { get; set; }
    public int PendingFormSubmissions { get; set; }
    public int PendingTasks { get; set; }
    public List<MonthlyStatistic> ProjectViewsLastYear { get; set; }
    public List<MonthlyStatistic> PropertyViewsLastYear { get; set; }
    public List<MonthlyStatistic> FormSubmissionsLastYear { get; set; }
    public List<TopPerformingProject> TopProjects { get; set; }
    public List<TopPerformingProperty> TopProperties { get; set; }
    public List<RecentActivity> RecentActivities { get; set; }
}
```

## Real-time Features (SignalR)

```csharp
// SignalR Hub
public class NotificationHub : Hub
{
    public async Task JoinUserGroup(string userId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"User_{userId}");
    }
    
    public async Task JoinAdminGroup()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, "Admins");
    }
    
    public async Task JoinEmployeeGroup()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, "Employees");
    }
}

// Notification Service
public interface INotificationService
{
    Task SendToUser(string userId, string title, string message, string titleAr = null, string messageAr = null);
    Task SendToAdmins(string title, string message, string titleAr = null, string messageAr = null);
    Task SendToEmployees(string title, string message, string titleAr = null, string messageAr = null);
    Task SendTaskNotification(string userId, TaskAssignment task);
    Task SendFormSubmissionNotification(FormSubmission submission);
    Task SendPropertyInterestNotification(UserInterest interest);
}
```

## Localization Configuration

```csharp
// Startup.cs / Program.cs
services.AddLocalization(options => options.ResourcesPath = "Resources");

services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCultures = new[] { "en-US", "ar-SA" };
    options.SetDefaultCulture(supportedCultures[1]) // Arabic as default
        .AddSupportedCultures(supportedCultures)
        .AddSupportedUICultures(supportedCultures);
});

// Custom localization for API responses
public class LocalizedApiResponse<T>
{
    public T Data { get; set; }
    public string Message { get; set; }
    public string MessageAr { get; set; }
    public bool Success { get; set; }
    public List<string> Errors { get; set; }
    public List<string> ErrorsAr { get; set; }
}
```

## Security & Authorization

```csharp
// JWT Configuration
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = true,
            ValidIssuer = configuration["JWT:Issuer"],
            ValidateAudience = true,
            ValidAudience = configuration["JWT:Audience"],
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

// Role-based Authorization Policies
services.AddAuthorization(options =>
{
    options.AddPolicy("EmployeeOrAbove", policy =>
        policy.RequireRole("Employee", "Admin", "SuperAdmin"));
    
    options.AddPolicy("AdminOrAbove", policy =>
        policy.RequireRole("Admin", "SuperAdmin"));
    
    options.AddPolicy("SuperAdminOnly", policy =>
        policy.RequireRole("SuperAdmin"));
});

// Custom Authorization Handlers
public class ProjectAssignmentHandler : AuthorizationHandler<ProjectAssignmentRequirement>
{
    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ProjectAssignmentRequirement requirement)
    {
        // Check if user is assigned to the project or has higher role
        // Implementation logic here
    }
}
```

## File Upload & Storage

```csharp
// File Upload Service
public interface IFileUploadService
{
    Task<string> UploadImageAsync(IFormFile file, string folder);
    Task<string> UploadVideoAsync(IFormFile file, string folder);
    Task<bool> DeleteFileAsync(string fileUrl);
    Task<List<string>> UploadMultipleImagesAsync(List<IFormFile> files, string folder);
}

// Implementation for Azure Blob Storage or Local Storage
public class AzureBlobStorageService : IFileUploadService
{
    // Implementation for Azure Blob Storage
}

public class LocalFileStorageService : IFileUploadService
{
    // Implementation for local file storage
}
```

## Error Handling & Logging

```csharp
// Global Exception Handler
public class GlobalExceptionMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }
    
    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        // Log exception and return appropriate response
    }
}

// Custom Exceptions
public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message) { }
    public NotFoundException(string message, string messageAr) : base(message)
    {
        MessageAr = messageAr;
    }
    public string MessageAr { get; set; }
}

public class ValidationException : Exception
{
    public ValidationException(string message) : base(message) { }
    public ValidationException(Dictionary<string, string> errors) : base("Validation failed")
    {
        Errors = errors;
    }
    public Dictionary<string, string> Errors { get; set; }
}
```

## Database Seeding

```csharp
// Data Seeder
public class DataSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        
        // Seed Roles
        await SeedRolesAsync(roleManager);
        
        // Seed Super Admin User
        await SeedSuperAdminAsync(userManager);
        
        // Seed Default Content
        await SeedContentAsync(context);
        
        // Seed Sample Data (for development)
        await SeedSampleDataAsync(context);
    }
}
```

## Performance Optimization

```csharp
// Caching Configuration
services.AddMemoryCache();
services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = configuration.GetConnectionString("Redis");
});

// Repository Pattern with Caching
public class CachedProjectRepository : IProjectRepository
{
    private readonly IProjectRepository _repository;
    private readonly IMemoryCache _cache;
    
    public async Task<Project> GetByIdAsync(int id)
    {
        var cacheKey = $"project_{id}";
        if (_cache.TryGetValue(cacheKey, out Project project))
        {
            return project;
        }
        
        project = await _repository.GetByIdAsync(id);
        _cache.Set(cacheKey, project, TimeSpan.FromMinutes(30));
        return project;
    }
}

// Background Services
public class EmailQueueService : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Process email queue
    }
}

public class AnalyticsProcessingService : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Process analytics data
    }
}
```

## API Versioning

```csharp
// API Versioning Configuration
services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = ApiVersion.Default;
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ApiVersionReader = ApiVersionReader.Combine(
        new UrlSegmentApiVersionReader(),
        new HeaderApiVersionReader("X-Version"),
        new MediaTypeApiVersionReader("ver")
    );
});

// Versioned Controllers
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class ProjectsV1Controller : ControllerBase
{
    // Version 1.0 implementation
}

[ApiVersion("2.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class ProjectsV2Controller : ControllerBase
{
    // Version 2.0 implementation with enhanced features
}
```

## Health Checks & Monitoring

```csharp
// Health Checks Configuration
services.AddHealthChecks()
    .AddDbContext<ApplicationDbContext>()
    .AddSqlServer(connectionString)
    .AddSignalR()
    .AddRedis(redisConnectionString);

// Custom Health Check
public class EmailServiceHealthCheck : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        // Check email service health
        return HealthCheckResult.Healthy();
    }
}
```

This documentation provides a comprehensive foundation for the ASP.NET Core backend development. The system supports all the business requirements you specified including role-based access control, multilingual support, real-time notifications, and comprehensive content management capabilities.
