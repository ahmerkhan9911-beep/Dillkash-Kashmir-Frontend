import { n as __toESM } from "../_runtime.mjs";
import { t as resolveImageUrl } from "./resolveImage-BSOQr9n2.mjs";
import { a as updateGuide, n as deleteGuide, r as getAllGuidesAdmin, t as createGuide } from "./guides-Ba4CryA6.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { P as LoaderCircle, s as UserCheck, t as X, u as Trash2, w as Pen, x as Plus } from "../_libs/lucide-react.mjs";
import { t as ImageUploader } from "./ImageUploader-yMOL_vjW.mjs";
import { t as DeleteConfirmDialog } from "./DeleteConfirmDialog-lvVQa56q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides.index-Fl5fR4H1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = {
	name: "",
	role: "",
	experience: 1,
	bio: "",
	imageUrl: ""
};
function AdminGuides() {
	const [guides, setGuides] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [message, setMessage] = (0, import_react.useState)("");
	const [messageType, setMessageType] = (0, import_react.useState)("success");
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [deleteLoading, setDeleteLoading] = (0, import_react.useState)(false);
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [formErrors, setFormErrors] = (0, import_react.useState)({});
	const load = () => {
		setLoading(true);
		getAllGuidesAdmin().then(setGuides).catch(console.error).finally(() => setLoading(false));
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const handleDelete = async () => {
		if (!deleteTarget) return;
		setDeleteLoading(true);
		try {
			await deleteGuide(deleteTarget.id);
			setMessageType("success");
			setMessage(`"${deleteTarget.name}" deleted successfully`);
			setDeleteTarget(null);
			load();
			setTimeout(() => setMessage(""), 3e3);
		} catch (err) {
			setMessageType("error");
			setMessage(err instanceof Error ? err.message : "Delete failed. Please try again.");
			setTimeout(() => setMessage(""), 4e3);
		} finally {
			setDeleteLoading(false);
		}
	};
	const openCreate = () => {
		setEditingId(null);
		setForm(emptyForm);
		setFormErrors({});
		setModalOpen(true);
	};
	const openEdit = (guide) => {
		setEditingId(guide.id);
		setForm({
			name: guide.name,
			role: guide.role,
			experience: guide.experience,
			bio: guide.bio,
			imageUrl: guide.imageUrl
		});
		setFormErrors({});
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
		setEditingId(null);
		setForm(emptyForm);
		setFormErrors({});
		setUploading(false);
	};
	const validateForm = () => {
		const err = {};
		if (form.name.trim().length < 2) err.name = "Name is required";
		if (form.role.trim().length < 2) err.role = "Role is required";
		if (form.experience < 1) err.experience = "At least 1 year";
		if (form.bio.trim().length < 10) err.bio = "Bio must be at least 10 characters";
		if (form.bio.length > 150) err.bio = "Bio must be 150 characters or less";
		setFormErrors(err);
		return Object.keys(err).length === 0;
	};
	const handleSave = async () => {
		if (!validateForm()) return;
		setSaving(true);
		try {
			if (editingId) {
				await updateGuide(editingId, { ...form });
				setMessageType("success");
				setMessage("Guide updated successfully");
			} else {
				await createGuide({
					...form,
					is_active: true
				});
				setMessageType("success");
				setMessage("Guide created successfully");
			}
			closeModal();
			load();
			setTimeout(() => setMessage(""), 3e3);
		} catch (err) {
			setMessageType("error");
			setMessage(err instanceof Error ? err.message : "Failed to save. Please try again.");
			setTimeout(() => setMessage(""), 4e3);
		} finally {
			setSaving(false);
		}
	};
	const inputCls = (hasError) => `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${hasError ? "border-destructive" : "border-input"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex flex-wrap items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-heading text-2xl font-extrabold text-foreground sm:text-3xl",
				children: "Tour Guides"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Manage tour guide profiles displayed on the public About page."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: openCreate,
				className: "inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-cta transition-transform hover:scale-[1.02]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 18 }), " Add New Guide"]
			})]
		}),
		message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${messageType === "error" ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"}`,
			children: message
		}),
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				size: 32,
				className: "animate-spin text-primary"
			})
		}) : guides.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-dashed border-border bg-card p-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {
						size: 24,
						className: "text-muted-foreground"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-heading text-base font-bold text-foreground",
					children: "No tour guides yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Add your first guide to get started."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openCreate,
					className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Add Guide"]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden rounded-xl bg-muted/50 px-4 py-2.5 md:grid md:grid-cols-[64px_1fr_140px_100px_120px] md:items-center md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Photo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Name & Bio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Role"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Experience"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-right",
						children: "Actions"
					})
				]
			}), guides.map((guide) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center md:grid md:grid-cols-[64px_1fr_140px_100px_120px] md:gap-4 md:p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: resolveImageUrl(guide.imageUrl),
							alt: guide.name,
							className: "h-full w-full object-cover"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate font-heading text-sm font-bold text-foreground",
							children: guide.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 line-clamp-1 text-xs text-muted-foreground",
							children: guide.bio
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold text-foreground",
						children: guide.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700",
						children: [guide.experience, "+ Years"]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => openEdit(guide),
							title: "Edit",
							className: "grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { size: 16 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDeleteTarget(guide),
							title: "Delete",
							className: "grid h-9 w-9 place-items-center rounded-xl border border-destructive/30 text-destructive transition-colors hover:bg-destructive/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 })
						})]
					})
				]
			}, guide.id))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
			open: !!deleteTarget,
			title: deleteTarget?.name || "",
			onConfirm: handleDelete,
			onCancel: () => setDeleteTarget(null),
			loading: deleteLoading
		}),
		modalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
			onClick: closeModal,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-8",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-heading text-lg font-bold text-foreground",
							children: editingId ? "Edit Guide" : "Add New Guide"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: editingId ? "Update the guide's profile information." : "Fill in the details to add a new tour guide."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: closeModal,
							className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "g-name",
									className: "mb-1.5 block text-sm font-semibold text-foreground",
									children: "Full Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "g-name",
									type: "text",
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									}),
									placeholder: "e.g. Ali Raza",
									className: inputCls(formErrors.name)
								}),
								formErrors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium text-destructive",
									children: formErrors.name
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "g-role",
										className: "mb-1.5 block text-sm font-semibold text-foreground",
										children: "Role / Designation"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "g-role",
										type: "text",
										value: form.role,
										onChange: (e) => setForm({
											...form,
											role: e.target.value
										}),
										placeholder: "e.g. Trekking Expert",
										className: inputCls(formErrors.role)
									}),
									formErrors.role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs font-medium text-destructive",
										children: formErrors.role
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "g-exp",
										className: "mb-1.5 block text-sm font-semibold text-foreground",
										children: "Years of Experience"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "g-exp",
										type: "number",
										min: 1,
										max: 50,
										value: form.experience,
										onChange: (e) => setForm({
											...form,
											experience: Number(e.target.value)
										}),
										className: inputCls(formErrors.experience)
									}),
									formErrors.experience && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs font-medium text-destructive",
										children: formErrors.experience
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "g-bio",
									className: "mb-1.5 block text-sm font-semibold text-foreground",
									children: "Short Bio"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "g-bio",
									rows: 3,
									maxLength: 150,
									value: form.bio,
									onChange: (e) => setForm({
										...form,
										bio: e.target.value
									}),
									placeholder: "A brief description of the guide's expertise and personality…",
									className: inputCls(formErrors.bio)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center justify-between",
									children: [formErrors.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium text-destructive",
										children: formErrors.bio
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("text-xs", form.bio.length > 150 ? "text-destructive" : "text-muted-foreground"),
										children: [form.bio.length, "/150"]
									})]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
								label: "Upload Profile Picture",
								value: form.imageUrl,
								onChange: (url) => setForm({
									...form,
									imageUrl: url
								}),
								onUploadingChange: setUploading
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "-mt-2 text-xs text-muted-foreground",
								children: "Recommended size: 500×500 px (JPG / PNG / WebP, max 5 MB)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex justify-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: closeModal,
							className: "rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleSave,
							disabled: saving || uploading,
							className: "rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-60",
							children: saving ? "Saving…" : uploading ? "Uploading…" : "Save Guide"
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { AdminGuides as component };
